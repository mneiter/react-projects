import os
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer


from app.logger import setup_logger
from app.routes.tasks import router as task_router
from app.routes.auth import router as auth_router

# === Load .env and setup logger ===
load_dotenv()
logger = setup_logger("main")

logger.debug("This is debug")
logger.info("App started")
logger.warning("This is a warning")
logger.error("An error occurred")

# === Debugging inside Docker ===
if os.getenv("IN_DOCKER") == "1":
    import debugpy
    debugpy.listen(("0.0.0.0", 5678))

# === FastAPI App Initialization ===
app = FastAPI()

# === CORS Settings for frontend ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Log every request ===
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response

# === Routers ===
app.include_router(task_router, prefix="/tasks", tags=["tasks"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
@app.get("/protected")
def protected(token: str = Depends(oauth2_scheme)):
    return {"message": "You are authenticated"}

@app.get("/")
async def root():
    logger.info("Root endpoint called")
    return {"message": "Welcome to the Task Manager API!"}
