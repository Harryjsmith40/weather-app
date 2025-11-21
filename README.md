🌦️ Nim’s Weather World

A full-stack weather companion app featuring Nim the Penguin 🐧.
Frontend: React + Vite + TailwindCSS
Backend: FastAPI
Hosting: Vercel (frontend) + Render (backend)

📁 Project Structure
weather-app/
 ├─ backend/     → FastAPI backend
 ├─ frontend/    → React + Vite frontend
 └─ render.yaml  → Render deployment config

⚙️ Tech Stack
Layer	Technology	Purpose
Backend	FastAPI, httpx	Weather API + caching
Frontend	React, Vite, Tailwind	UI, animation, geolocation
Hosting	Render + Vercel	API + frontend deployment
Weather Provider	OpenWeatherMap	Forecast data

🚀 Running Locally
Backend
cd backend
python -m venv venv
venv\Scripts\activate  (Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at:
http://127.0.0.1:8000

Frontend
cd frontend
npm install
npm run dev

Frontend runs at:
http://127.0.0.1:5173

🌐 Deployment URLs
Component	URL
Frontend	https://weather-app-two-blush-14.vercel.app
Backend	https://weather-backend-zuwu.onrender.com

🧠 Future Enhancements
Animated weather scenes
Nim’s generative daily stories
PWA installability
Redis-based persistent caching