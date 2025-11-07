import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Weather App Backend"
    environment: str = os.getenv("ENV", "development")

settings = Settings()
