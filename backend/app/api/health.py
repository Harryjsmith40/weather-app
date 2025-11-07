from fastapi import APIRouter
import datetime

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
async def health_check():
    return {
        "status": "ok",
        "message": "Weather backend is alive!",
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
    }
