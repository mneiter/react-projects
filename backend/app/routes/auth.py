from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter()

SECRET_KEY = "your_secret_key_here"  # вынеси потом в .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/auth/register", response_model=TokenResponse)
def register_user(req: RegisterRequest):
    # Здесь могла бы быть проверка в базе
    if not req.password or len(req.password) < 4:
        raise HTTPException(status_code=400, detail="Password too short")

    token = create_access_token(data={"sub": req.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/auth/login", response_model=TokenResponse)
def login_user(req: LoginRequest):
    if not req.email or not req.password:
        raise HTTPException(status_code=400, detail="Missing credentials")

    # Здесь могла бы быть проверка в MongoDB
    # Пока разрешаем вход всем, кто ввёл email и password
    token = create_access_token(data={"sub": req.email})
    return {"access_token": token, "token_type": "bearer"}
