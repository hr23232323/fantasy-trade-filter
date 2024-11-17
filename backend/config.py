from fastapi.middleware.cors import CORSMiddleware
import os

# Read the allowed frontend URL from environment variables
frontend_url = os.getenv("REACT_APP_FE_URL")

# Define the allowed origins using the environment variable
origins = [
    frontend_url,  # Allows the frontend URL defined in .env to make requests
]

# CORS Middleware Configuration
def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
        allow_headers=["*"],  # Allows all headers
    )
