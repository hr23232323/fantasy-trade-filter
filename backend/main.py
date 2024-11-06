from dotenv import load_dotenv

# Load environment variables from .env file early
# so every child module also has access
load_dotenv()

# Rest of the imports (including submodules)
from config import add_cors_middleware  # Custom CORs config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import pandas as pd
import requests

# Setup App and configs (including CORs) and base API path
app = FastAPI()

# Add CORS middleware from the config module
add_cors_middleware(app)

# Define the URL of the CSV file
CSV_URL = "https://raw.githubusercontent.com/dynastyprocess/data/refs/heads/master/files/values.csv"

# Function to load CSV from a URL
def load_data_from_url(url: str) -> pd.DataFrame:
    response = requests.get(url)
    response.raise_for_status()  # Ensure we notice if there's an issue
    # Use StringIO to read CSV directly from text response content
    from io import StringIO
    csv_data = StringIO(response.text)
    return pd.read_csv(csv_data)

# Load the data when the server starts
df = load_data_from_url(CSV_URL)

@app.get("/filter")
async def filter_players(
    position: Optional[str] = None,
    min_age: Optional[float] = None,
    max_age: Optional[float] = None,
    sort_field: str = "age",
    sort_order: str = "asc"
) -> List[dict]:
    filtered_df = df

    # Apply position filter if provided
    if position:
        # Convert comma-separated string to list
        position_list = position.split(",")
        filtered_df = filtered_df[filtered_df['pos'].isin(position_list)]
    
    # Apply age filters
    if min_age is not None:
        filtered_df = filtered_df[filtered_df['age'] >= min_age]
    if max_age is not None:
        filtered_df = filtered_df[filtered_df['age'] <= max_age]

    # Apply sorting
    if sort_field in filtered_df.columns:
        ascending = True if sort_order == "asc" else False
        filtered_df = filtered_df.sort_values(by=sort_field, ascending=ascending)

    return filtered_df.to_dict(orient='records')

@app.post("/refresh-data")
async def refresh_data():
    global df
    try:
        df = load_data_from_url(CSV_URL)
        return {"status": "Data refreshed successfully"}
    except requests.RequestException as e:
        return {"status": "Error refreshing data", "details": str(e)}
