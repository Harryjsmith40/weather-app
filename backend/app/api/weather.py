from fastapi import APIRouter, HTTPException, Query
import httpx
import os
from datetime import datetime, timedelta

# Router setup
router = APIRouter(prefix="/weather", tags=["weather"])

# In-memory caches
weather_cache = {}
city_cache = {}

API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/3.0/onecall"
GEOCODE_URL = "http://api.openweathermap.org/geo/1.0/reverse"

# ✅ Support both /weather and /weather/ to prevent redirect loops
@router.get("")
@router.get("/")
async def get_weather(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
):
    """
    Fetch current, hourly, and daily weather for given coordinates.
    Includes reverse geocoding (city name) and 10-minute caching.
    """

    if API_KEY is None:
        raise HTTPException(status_code=500, detail="OpenWeatherMap API key not set")

    cache_key = f"{lat:.3f},{lon:.3f}"
    now = datetime.utcnow()

    # --- Weather cache check (10 min expiry) ---
    if cache_key in weather_cache:
        cached_data, timestamp = weather_cache[cache_key]
        if now - timestamp < timedelta(minutes=10):
            return cached_data

    # --- Fetch weather data ---
    params = {
        "lat": lat,
        "lon": lon,
        "exclude": "minutely,alerts",
        "units": "metric",
        "appid": API_KEY,
    }

    try:
        async with httpx.AsyncClient() as client:
            weather_response = await client.get(BASE_URL, params=params)
            weather_response.raise_for_status()
            weather_data = weather_response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather API error: {str(e)}")

    # --- Fetch city name (cached separately for performance) ---
    city_name = city_cache.get(cache_key)
    if not city_name:
        try:
            async with httpx.AsyncClient() as client:
                geo_params = {"lat": lat, "lon": lon, "limit": 1, "appid": API_KEY}
                geo_response = await client.get(GEOCODE_URL, params=geo_params)
                geo_response.raise_for_status()
                geo_data = geo_response.json()
                if geo_data and len(geo_data) > 0:
                    city_name = geo_data[0].get("name", "Unknown")
                    city_cache[cache_key] = city_name
                else:
                    city_name = "Unknown"
        except Exception as e:
            print(f"Reverse geocoding failed: {e}")
            city_name = "Unknown"

    # --- Normalize response ---
    normalized = {
        "location": city_name,
        "current": weather_data.get("current", {}),
        "hourly": weather_data.get("hourly", []),
        "daily": weather_data.get("daily", []),
    }

    # --- Cache weather data ---
    weather_cache[cache_key] = (normalized, now)

    return normalized
