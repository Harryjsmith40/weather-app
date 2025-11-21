from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import health, weather

app = FastAPI(
    title="Weather App Backend",
    version="0.1.0",
    description="FastAPI backend for Weather App with Generative Stories",
)

from fastapi.middleware.cors import CORSMiddleware

# CORS configuration
origins = [
    "https://weather-app-two-blush-14.vercel.app",  # your Vercel frontend
    "http://localhost:5173",                        # local dev (optional)
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)
app.include_router(weather.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Weather App backend!"}
