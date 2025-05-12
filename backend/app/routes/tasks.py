from fastapi import APIRouter, HTTPException
from app.models import Task
from app.database import task_collection
from bson.objectid import ObjectId

router = APIRouter()

# Helper to convert Mongo document to dict
def task_helper(task) -> dict:
    return {
        "id": str(task["_id"]),
        "title": task["title"],
        "completed": task["completed"],
    }

@router.get("/")
async def get_tasks():
    tasks = [task_helper(t) for t in task_collection.find()]
    return tasks

@router.post("/")
async def create_task(task: Task):
    task_dict = task.dict(exclude={"id"})
    result = task_collection.insert_one(task_dict)
    new_task = task_collection.find_one({"_id": result.inserted_id})
    return task_helper(new_task)

@router.patch("/{task_id}")
async def update_task(task_id: str, task: Task):
    update_data = task.dict(exclude_unset=True, exclude={"id"})
    result = task_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")

    updated_task = task_collection.find_one({"_id": ObjectId(task_id)})
    return task_helper(updated_task)

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    result = task_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"success": True}
