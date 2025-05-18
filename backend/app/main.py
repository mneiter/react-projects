import os
import logging

logger = logging.basicConfig(level=logging.INFO)

if os.getenv("IN_DOCKER") == "1":
    import debugpy
    debugpy.listen(("0.0.0.0", 5678))
    logger.info("IN_DOCKER environment variable is set: %s", os.getenv("IN_DOCKER"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.tasks import router as task_router
from app.routes.auth import router as auth_router


app = FastAPI()

# Enable CORS for localhost:3000 (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router, prefix="/tasks", tags=["tasks"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
@app.get("/")
async def root():
    return {"message": "Welcome to the Task Manager API!"}
