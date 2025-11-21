🧠 Weather App Backend (FastAPI)

This backend powers Nim’s Weather World, providing weather data, geolocation resolution, and caching.

📦 Features
Current/hourly/daily forecast
Reverse geocoding for city names
10-minute weather caching
Dedicated routers (/health, /weather)
CORS support for Vercel frontend

📁 Folder Structure
backend/
 ├─ app/
 │   ├─ main.py
 │   ├─ api/
 │   │   ├─ health.py
 │   │   └─ weather.py
 ├─ requirements.txt
 └─ venv/ (local only)

🔧 Local Setup
cd backend
python -m venv venv
venv\Scripts\activate   (Windows)
pip install -r requirements.txt

Set environment variable:
set OPENWEATHER_API_KEY=4a8b38de8293362b1825be812bdc4fcb   (Windows)

Run server:
uvicorn app.main:app --reload

🌐 Deployment (Render)
Render detects render.yaml at repo root.
Environment variables required:
OPENWEATHER_API_KEY = 4a8b38de8293362b1825be812bdc4fcb

🧵 Endpoints
Endpoint	Description
/	Welcome message
/health/	Health check JSON
/weather/?lat=X&lon=Y	Weather + location data
🧠 Example Weather Response
{
  "location": "Sydney",
  "current": { ... },
  "hourly": [ ... ],
  "daily": [ ... ]
}