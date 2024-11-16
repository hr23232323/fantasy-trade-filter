from dotenv import load_dotenv

# Load environment variables from .env file early
# so every child module also has access
load_dotenv()

# Rest of the imports (including submodules)
import os
import json
import fetch
from config import add_cors_middleware  # Custom CORs config
from fastapi import FastAPI, HTTPException, Query
from google.cloud import storage
from typing import Optional, List

# Setup App and configs (including CORs) and base API path
app = FastAPI()

# Add CORS middleware from the config module
add_cors_middleware(app)

# GCP bucket + file details
BUCKET_NAME = "ftt-players-data"
FILE_NAME = "player_data.json"
LOCAL_TEST_FILE="./tmp/player_data.json"

# Allowed fields for sorting
ALLOWED_POSITIONS = ["QB", "WR", "TE", "RB", "RDP"]
ALLOWED_SORT_FIELDS = ["age", "playerName", "team", "byeWeek", "oneQBValues.value", "superflexValues.value"]


def load_json_from_gcs(bucket_name: str, file_name: str) -> List[dict]:
    """
    Load JSON data from a Google Cloud Storage bucket.
    
    Args:
        bucket_name (str): GCS bucket name.
        file_name (str): File name within the bucket.
    
    Returns:
        List[dict]: List of player dictionaries.
    """
    
    # Read the allowed frontend URL from environment variables
    gcs_enabled = os.getenv("ENABLE_GCS", "0") == "1"
    
    try:
        if gcs_enabled:
            # Use data from GCS
            storage_client = storage.Client()
            bucket = storage_client.bucket(bucket_name)
            blob = bucket.blob(file_name)
            data = json.loads(blob.download_as_text())
            return data
        else:
            # Use local data
            if not os.path.exists(LOCAL_TEST_FILE):
                raise FileNotFoundError(f"Local file not found at {LOCAL_TEST_FILE}")
            
            with open(LOCAL_TEST_FILE, "r") as f:
                data = json.load(f)
            return data
            
    except Exception as e:
        source = "GCS" if gcs_enabled else "local file"
        raise HTTPException(status_code=500, detail=f"Failed to load data from {source}: {str(e)}")


def filter_by_position(data: List[dict], position: Optional[str]) -> List[dict]:
    """Filter players by position, validating input against allowed positions."""
    if position:
        position_list = position.split(",")
        
        # Validate each position in the input
        invalid_positions = [pos for pos in position_list if pos not in ALLOWED_POSITIONS]
        if invalid_positions:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid positions: {', '.join(invalid_positions)}. Allowed positions: {', '.join(ALLOWED_POSITIONS)}"
            )
        
        # Filter players by the validated position list
        return [p for p in data if p.get('position') in position_list]
    
    return data


def filter_by_age(data: List[dict], min_age: Optional[float], max_age: Optional[float]) -> List[dict]:
    """Filter players by age and exclude picks (age=0.0)."""
    filtered_data = []
    for player in data:
        age = player.get('age', 0.0)
        if age == 0.0:  # Exclude picks
            continue
        if (min_age is None or age >= min_age) and (max_age is None or age <= max_age):
            filtered_data.append(player)
    return filtered_data

def get_nested_value(obj: dict, path: str):
    """Retrieve a nested value from a dictionary using dot notation."""
    keys = path.split('.')
    for key in keys:
        obj = obj.get(key, 0)
    return obj

def sort_data(data: List[dict], sort_field: str, sort_order: str) -> List[dict]:
    """Sort players data based on the sort field and order."""
    if sort_field not in ALLOWED_SORT_FIELDS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid sort field: {sort_field}. Allowed fields: {', '.join(ALLOWED_SORT_FIELDS)}"
        )
        
    reverse = sort_order == "desc"
    return sorted(data, key=lambda x: get_nested_value(x, sort_field), reverse=reverse)

@app.get("/all-players")
async def all_players() -> List[dict]:
    """
    Returns all players.
    """
    try:
        # Load data from GCS or local
        players_data = load_json_from_gcs(BUCKET_NAME, FILE_NAME)

        return players_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/filter")
async def filter_players(
    position: Optional[str] = None,
    min_age: Optional[float] = None,
    max_age: Optional[float] = None,
    sort_field: str = "age",
    sort_order: str = Query("asc", regex="^(asc|desc)$")
) -> List[dict]:
    """
    Filters and sorts player data based on query parameters.
    """
    try:
        # Load data from GCS or local
        players_data = load_json_from_gcs(BUCKET_NAME, FILE_NAME)

        # Apply filters and sorting
        players_data = filter_by_position(players_data, position)
        players_data = filter_by_age(players_data, min_age, max_age)
        players_data = sort_data(players_data, sort_field, sort_order)

        return players_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

app.include_router(fetch.router, prefix="/fetch", tags=["fetch"])
