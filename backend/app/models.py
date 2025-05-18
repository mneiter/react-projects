from pydantic import BaseModel
from typing import Optional

class TaskModel(BaseModel):
    title: str
    completed: bool = False

class UpdateTaskModel(BaseModel):
    title: Optional[str]
    completed: Optional[bool]

def task_helper(task) -> dict:
    return {
        "id": str(task["_id"]),
        "title": task["title"],
        "completed": task.get("completed", False),
        "owner": task["owner"],
    }
