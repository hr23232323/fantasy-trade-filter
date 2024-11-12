import os
import re
from fastapi import APIRouter, HTTPException
from google.cloud import storage
from bs4 import BeautifulSoup
import requests
import json
import datetime
from typing import List
from custom_types import parse_player_data

router = APIRouter()

# GCP bucket + file details
BUCKET_NAME = "ftt-players-data"
FILE_NAME = "player_data.json"


def fetch_players_array(url: str):
    """Fetch and parse the playersArray from the HTML of the given URL."""
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch data. Status code: {response.status_code}")
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the <script> containing playersArray
    script_tag = soup.find('script', text=lambda text: 'var playersArray =' in text if text else False)
    if not script_tag:
        raise Exception("Failed to find playersArray in the HTML.")
    
    # Extract and parse playersArray
    players_array_match = re.search(r'var playersArray = (\[.*?\]);', script_tag.string, re.DOTALL)
    if not players_array_match:
        raise Exception("playersArray not found in the script content.")
    
    players_array = json.loads(players_array_match.group(1))
    return players_array

def process_player_data(raw_players_data: List[dict]):
    """
    Processes raw player data, filters the desired fields, and returns filtered list.
    
    Args:
        raw_players_data (List[dict]): List of raw player JSON objects.
        file_name (str): Name of the output file.
    """
    filtered_players = []
    dropped_players = []
    
    for raw_player in raw_players_data:
        try:
            player = parse_player_data(raw_player)
            filtered_players.append(player.dict())  # Convert Pydantic model to dict
        except Exception as e:
            # Collect details about the player that failed validation
            player_name = raw_player.get("playerName", "Unknown Player")
            dropped_players.append({"playerName": player_name, "reason": str(e)})


    return filtered_players
    

def upload_to_gcs(bucket_name, file_name, data):
    """Uploads the given data to Google Cloud Storage as a JSON file."""
    # Initialize Cloud Storage client
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(file_name)
    blob.upload_from_string(json.dumps(data, indent=4), content_type='application/json')
    return f"gs://{bucket_name}/{file_name}"


def upload_to_local_tmp(file_name: str, data: dict) -> str:
    """
    Simulates uploading a JSON file to GCS by writing it to a local tmp directory.

    Args:
        file_name (str): The name of the JSON file.
        data (dict): The data to be written to the JSON file.

    Returns:
        str: The path to the locally saved JSON file.
    """
    # Get a temporary directory path
    tmp_dir = './tmp'
    
    # Create the full file path
    file_path = os.path.join(tmp_dir, file_name)
    
    # Write the JSON data to the file
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"File saved locally at: {file_path}")
    return file_path

@router.post("/")
def fetch_players_data():
    """FastAPI endpoint to fetch player data and upload to GCS."""
    url = "https://keeptradecut.com/dynasty-rankings"
    
    # Read the allowed frontend URL from environment variables
    gcs_enabled = os.getenv("ENABLE_GCS", "0") == "1"
    
    try:
        # Fetch the latest player data
        players_data = fetch_players_array(url)
        
        # Parse each player using Pydantic to only keep specific fields
        parsed_players_data = process_player_data(players_data)
        
        if gcs_enabled:
            print("Uploading file to GCS...")
            gcs_url = upload_to_gcs(BUCKET_NAME, FILE_NAME, parsed_players_data)
            print("Uploaded!")
            return {"message": "Data successfully updated", "file_url": gcs_url}
        else:
            print("Uploading file to Local TMP dir...")
            file_path = upload_to_local_tmp(FILE_NAME, parsed_players_data)
            print("Uploaded!")
            return {"message": "Data successfully created - TMP", "file_path": file_path}
    
    except Exception as e:
        print("Error fetching or uploading data")
        raise HTTPException(status_code=500, detail=str(e))
