from fastapi import APIRouter, HTTPException, Depends
from app.auth_utils import get_current_user
from app.models import task_helper, TaskModel, UpdateTaskModel
from app.database import get_task_collection
from bson.objectid import ObjectId
from pymongo.collection import Collection
from pymongo.errors import PyMongoError

router = APIRouter()


@router.get("/")
async def get_tasks(
    current_user: str = Depends(get_current_user),
    task_collection: Collection = Depends(get_task_collection),
) -> list:
    try:
        tasks_cursor = task_collection.find({"owner": current_user})
        tasks = [task_helper(task) for task in tasks_cursor]
        return tasks
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.post("/")
async def create_task(
    task: TaskModel,
    current_user: str = Depends(get_current_user),
    task_collection: Collection = Depends(get_task_collection),
) -> dict:
    try:
        task_dict = task.model_dump()
        task_dict["owner"] = current_user
        new_task = task_collection.insert_one(task_dict)
        created_task = task_collection.find_one({"_id": new_task.inserted_id})
        return task_helper(created_task)
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.patch("/{id}")
async def update_task(
    id: str,
    data: UpdateTaskModel,
    current_user: str = Depends(get_current_user),
    task_collection: Collection = Depends(get_task_collection),
) -> dict:
    try:
        task = task_collection.find_one({"_id": ObjectId(id), "owner": current_user})
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        task_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data.model_dump(exclude_unset=True)}
        )
        updated_task = task_collection.find_one({"_id": ObjectId(id)})
        return task_helper(updated_task)
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid request: {str(e)}")


@router.delete("/{id}")
async def delete_task(
    id: str,
    current_user: str = Depends(get_current_user),
    task_collection: Collection = Depends(get_task_collection),
) -> dict:
    try:
        task = task_collection.find_one({"_id": ObjectId(id), "owner": current_user})
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        task_collection.delete_one({"_id": ObjectId(id)})
        return {"message": "Task deleted"}
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid request: {str(e)}")
