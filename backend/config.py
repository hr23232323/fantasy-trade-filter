import os
from fastapi.middleware.cors import CORSMiddleware

# Read the allowed frontend URLs from environment variables
frontend_urls = os.getenv("REACT_APP_FE_URL", "")  # Default to an empty string if not set

# Split the URLs by comma and strip whitespace from each URL
origins = [url.strip() for url in frontend_urls.split(",") if url.strip()]

# CORS Middleware Configuration
def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,  # List of allowed origins
        allow_credentials=True,
        allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
        allow_headers=["*"],  # Allows all headers
    )
