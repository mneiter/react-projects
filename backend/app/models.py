from pydantic import BaseModel
from typing import Optional, Any, Dict


class TaskModel(BaseModel):
    title: str
    completed: bool = False


class UpdateTaskModel(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None


def task_helper(task: Dict[str, Any]) -> dict:
    return {
        "id": str(task.get("_id", "")),
        "title": task.get("title", ""),
        "completed": task.get("completed", False),
        "owner": task.get("owner", ""),
    }
