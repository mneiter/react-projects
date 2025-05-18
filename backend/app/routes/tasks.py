from fastapi import APIRouter, HTTPException, Depends
from app.auth_utils import get_current_user
from app.models import task_helper, TaskModel, UpdateTaskModel
from app.database import task_collection
from bson.objectid import ObjectId

router = APIRouter()

@router.get("/")
async def get_tasks(current_user: str = Depends(get_current_user)):
    tasks_cursor = task_collection.find({"owner": current_user})
    tasks = [task_helper(task) for task in tasks_cursor]
    return tasks

@router.post("/")
async def create_task(task: TaskModel, current_user: str = Depends(get_current_user)):
    task_dict = task.dict()
    task_dict["owner"] = current_user
    new_task = task_collection.insert_one(task_dict)
    created_task = task_collection.find_one({"_id": new_task.inserted_id})
    return task_helper(created_task)

@router.patch("/{id}")
async def update_task(id: str, data: UpdateTaskModel, current_user: str = Depends(get_current_user)):
    task = task_collection.find_one({"_id": ObjectId(id), "owner": current_user})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task_collection.update_one({"_id": ObjectId(id)}, {"$set": data.dict(exclude_unset=True)})
    updated_task = task_collection.find_one({"_id": ObjectId(id)})
    return task_helper(updated_task)

@router.delete("/{id}")
async def delete_task(id: str, current_user: str = Depends(get_current_user)):
    task = task_collection.find_one({"_id": ObjectId(id), "owner": current_user})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "Task deleted"}

