import os
from pymongo import MongoClient, errors
from dotenv import load_dotenv

load_dotenv()


def get_mongo_url():
    return os.environ.get("MONGODB_URL", "mongodb://localhost:27017/todo-api")


def get_client():
    try:
        client = MongoClient(get_mongo_url(), serverSelectionTimeoutMS=5000)
        # Try to connect to trigger exception if cannot connect
        client.admin.command("ping")
        return client
    except errors.PyMongoError as e:
        print(f"Error connecting to MongoDB: {e}")
        return None


def get_database():
    client = get_client()
    if client:
        return client["todo-api"]
    else:
        return None


def get_task_collection():
    db = get_database()
    if db:
        return db["tasks"]
    else:
        return None
