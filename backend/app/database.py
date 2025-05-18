from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.environ.get("MONGODB_URL", "mongodb://localhost:27017/todo-api")

client = MongoClient(MONGODB_URL)
db = client["todo-api"]
task_collection = db["tasks"]

def get_database():
    return db
