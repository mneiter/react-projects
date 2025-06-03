import os
from pymongo import MongoClient, errors
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path=env_path)

def get_mongo_url():
    return os.environ.get("MONGODB_URL", f"mongodb://localhost:27017")

def get_mongo_db():
    return os.environ.get("MONGODB_DB", f"todo-api")

def get_mongo():
    return f"{get_mongo_url()}/{get_mongo_db()}"

def get_client():
    try:
        client = MongoClient(get_mongo(), serverSelectionTimeoutMS=5000)
        # Try to connect to trigger exception if cannot connect
        client.admin.command("ping")
        return client
    except errors.PyMongoError as e:
        print(f"Error connecting to MongoDB: {e}")
        return None

def get_database():
    client = get_client()
    db_name = get_mongo_db()
    if client:
        return client[db_name]
    return None


def get_task_collection():
    db = get_database()
    if db:
        return db["tasks"]
    else:
        return None
