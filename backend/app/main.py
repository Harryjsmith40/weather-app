from fastapi import FastAPI
from .api import health, weather

app = FastAPI(
    title="Weather App Backend",
    version="0.1.0",
    description="FastAPI backend for Weather App with Generative Stories",
)

# Include routers
app.include_router(health.router)
app.include_router(weather.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Weather App backend!"}
