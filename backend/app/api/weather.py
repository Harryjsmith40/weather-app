from fastapi import APIRouter, HTTPException, Query
import requests
import os
from datetime import datetime, timedelta

router = APIRouter(prefix="/weather", tags=["weather"])

# Simple in-memory cache
cache = {}

API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/3.0/onecall"

@router.get("/")
def get_weather(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
):
    if API_KEY is None:
        raise HTTPException(status_code=500, detail="OpenWeatherMap API key not set")

    cache_key = f"{lat},{lon}"
    # Cache expiry 10 minutes
    if cache_key in cache:
        cached_data, timestamp = cache[cache_key]
        if datetime.utcnow() - timestamp < timedelta(minutes=10):
            return cached_data

    params = {
        "lat": lat,
        "lon": lon,
        "exclude": "minutely,alerts",
        "units": "metric",
        "appid": API_KEY,
    }

    response = requests.get(BASE_URL, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching weather data")

    data = response.json()

    # Normalize response: keep current + hourly 48h + daily 7d
    normalized = {
        "current": data.get("current", {}),
        "hourly": data.get("hourly", []),
        "daily": data.get("daily", []),
    }

    # Save to cache
    cache[cache_key] = (normalized, datetime.utcnow())

    return normalized
