import os
from functools import lru_cache
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from dotenv import load_dotenv

# === Load environment variables ===
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path=env_path)


# === Cached access to environment ===
@lru_cache()
def get_mongo_url() -> str:
    return os.environ.get("MONGODB_URL", "mongodb://localhost:27017")


@lru_cache()
def get_mongo_db() -> str:
    return os.environ.get("MONGODB_DB", "todo-api")


# === MongoDB client and collections ===
client: MongoClient = MongoClient(f"{get_mongo_url()}/{get_mongo_db()}")
db: Database = client[get_mongo_db()]
task_collection: Collection = db["tasks"]


# === Dependency-compatible accessors ===
def get_database() -> Database:
    return db


def get_task_collection() -> Collection:
    return task_collection
