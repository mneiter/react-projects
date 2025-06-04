from pydantic import BaseModel
from typing import Optional, Any, Dict


class TaskModel(BaseModel):
    title: str
    completed: bool = False


class UpdateTaskModel(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None


class TaskResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    is_done: Optional[bool] = False


def task_helper(task: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    if task is None:
        raise ValueError("task_helper received None")
    return {
        "id": str(task.get("_id", "")),
        "title": task.get("title", ""),
        "completed": task.get("completed", False),
        "owner": task.get("owner", ""),
    }
