from typing import Any, cast
import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import AsyncMock, patch
from app.main import app
import uuid

TEST_USER = {
    "email": "testuser@example.com",
    "password": "testpassword123"
}

transport = ASGITransport(app=cast(Any, app))

@pytest.mark.asyncio
@patch("app.routes.auth.get_database")
async def test_register_user(mock_get_db):
    email = f"test_{uuid.uuid4()}@example.com"
    mock_users = {
        "find_one": AsyncMock(return_value=None),
        "insert_one": AsyncMock(),
    }
    mock_get_db.return_value.__getitem__.return_value = mock_users

    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/auth/register", json={"email": email, "password": TEST_USER["password"]})
        assert response.status_code == 201
        assert "access_token" in response.json()


@pytest.mark.asyncio
@patch("app.routes.auth.get_database")
async def test_login_user_success(mock_get_db):
    hashed_password = "$2b$12$KIXx.4j1EBH3R3KwUiSP..khBapN1ON44E3M1B92XD5FZ6ycrw/yG"  # hash for testpassword123
    mock_users = {
        "find_one": AsyncMock(return_value={"email": TEST_USER["email"], "hashed_password": hashed_password})
    }
    mock_get_db.return_value.__getitem__.return_value = mock_users

    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/auth/login", json=TEST_USER)
        assert response.status_code == 200
        assert "access_token" in response.json()


@patch("app.routes.auth.get_database")
@patch("app.routes.auth.pwd_context.verify", return_value=False)
@pytest.mark.asyncio
async def test_login_user_invalid_password(mock_verify, mock_get_db):
    mock_users = {
        "find_one": AsyncMock(return_value={"email": TEST_USER["email"], "hashed_password": "irrelevant"})
    }
    mock_get_db.return_value.__getitem__.return_value = mock_users

    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/auth/login", json=TEST_USER)
        assert response.status_code == 400



@patch("app.routes.auth.get_database")
@patch("app.routes.auth.pwd_context.verify", return_value=False)
@pytest.mark.asyncio
async def test_login_user_not_found(mock_verify, mock_get_db):
    mock_users = {
        "find_one": AsyncMock(return_value=None)
    }
    mock_get_db.return_value.__getitem__.return_value = mock_users

    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/auth/login", json=TEST_USER)
        assert response.status_code == 400

@patch("app.routes.auth.get_database")
@patch("app.routes.auth.pwd_context.verify", return_value=True)
@pytest.mark.asyncio
async def test_login_with_oauth(mock_verify, mock_get_db):
    mock_users = {
        "find_one": AsyncMock(return_value={"email": TEST_USER["email"], "hashed_password": "irrelevant"})
    }
    mock_get_db.return_value.__getitem__.return_value = mock_users

    data = {
        "username": TEST_USER["email"],
        "password": TEST_USER["password"]
    }
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/auth/token", data=data)
        assert response.status_code == 200
        assert "access_token" in response.json()

