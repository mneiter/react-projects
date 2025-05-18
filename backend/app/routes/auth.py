from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.database import get_database
from pymongo.database import Database

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "super_secret_jwt_key_123"
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

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register_user(req: RegisterRequest, db: Database = Depends(get_database)):
    users = db["users"]

    # Проверка на существующий email
    if users.find_one({"email": req.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(req.password)

    new_user = {
        "email": req.email,
        "hashed_password": hashed_password,
        "created_at": datetime.utcnow()
    }

    users.insert_one(new_user)

    token = create_access_token(data={"sub": req.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=TokenResponse)
def login_user(req: LoginRequest, db: Database = Depends(get_database)):
    users = db["users"]

    user = users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not pwd_context.verify(req.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token(data={"sub": req.email})
    return {"access_token": token, "token_type": "bearer"}
