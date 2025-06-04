import pytest
from fastapi import FastAPI
from httpx import AsyncClient
from httpx._transports.asgi import ASGITransport
from bson import ObjectId
from unittest.mock import MagicMock
from typing import Any, cast
from app.routes.tasks import router
from app.database import get_task_collection
from app.auth_utils import get_current_user

# Create test FastAPI app
app = FastAPI()
app.include_router(router, prefix="/tasks")

# Override get_current_user
app.dependency_overrides[get_current_user] = lambda: "test_user"

# Mock MongoDB collection and override get_task_collection
mock_collection = MagicMock()
mock_task = {
    "_id": ObjectId(),
    "title": "Test Task",
    "completed": False,
    "owner": "test_user",
}
mock_collection.find.return_value = [mock_task]
mock_collection.find_one.return_value = mock_task
mock_collection.insert_one.return_value.inserted_id = mock_task["_id"]
mock_collection.update_one.return_value.modified_count = 1
mock_collection.delete_one.return_value.deleted_count = 1
app.dependency_overrides[get_task_collection] = lambda: mock_collection

# Cast FastAPI to Any to satisfy ASGITransport type checkers
transport = ASGITransport(app=cast(Any, app))

@pytest.mark.asyncio
async def test_get_tasks():
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/tasks/")
    assert res.status_code == 200
    assert isinstance(res.json(), list)

@pytest.mark.asyncio
async def test_create_task():
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.post("/tasks/", json={"title": "New Task", "completed": False})
    assert res.status_code == 200
    assert res.json()["title"] == "Test Task"

@pytest.mark.asyncio
async def test_update_task():
    task_id = str(ObjectId())
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.patch(f"/tasks/{task_id}", json={"completed": True})
    assert res.status_code == 200
    assert "title" in res.json()

@pytest.mark.asyncio
async def test_delete_task():
    task_id = str(ObjectId())
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.delete(f"/tasks/{task_id}")
    assert res.status_code == 200
    assert res.json()["message"] == "Task deleted"