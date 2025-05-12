from pydantic import BaseModel, Field
from typing import Optional

class Task(BaseModel):
    id: Optional[str] = None  # for responses
    title: str
    completed: bool = False
