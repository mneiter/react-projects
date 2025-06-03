import os
from pymongo import MongoClient, errors
from dotenv import load_dotenv

load_dotenv()

# === Load .env only once ===
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path=env_path)

# === Global cached client ===
_client: MongoClient | None = None

def get_mongo_url() -> str:
    return os.environ.get("MONGODB_URL", "mongodb://localhost:27017")

def get_mongo_db() -> str:
    return os.environ.get("MONGODB_DB", "todo-api")

MONGODB_URL = f"{get_mongo_url()}/{get_mongo_db()}"

client = MongoClient(MONGODB_URL)
db = client["todo-api"]
task_collection = db["tasks"]

def get_database():
    return db

def get_task_collection():
    return task_collection


