from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Annotated
import jwt
import bcrypt
import os
import libsql
from dotenv import load_dotenv


from database import get_db

load_dotenv()

router = APIRouter(prefix="/auth", tags=["auth"])


SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
try:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
except ValueError:
    ACCESS_TOKEN_EXPIRE_MINUTES = 30


class SignUpRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())


def create_access_token(user_id: int, email: str) -> str:
    """Create JWT token"""
    payload = {
        "sub": str(user_id),
        "email": email,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(
    data: SignUpRequest, conn: Annotated[libsql.Connection, Depends(get_db)]
):
    """Register a new user using direct SQL"""
    print(f" Signup request for: {data.email}")

    try:

        print("Checking if user exists...")
        existing_user = conn.execute(
            "SELECT id FROM user WHERE email = ?", [data.email]
        ).fetchone()

        if existing_user:
            print(f" User already exists: {data.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        print("Hashing password...")
        hashed_password = hash_password(data.password)

        print("Creating new user...")
        conn.execute(
            "INSERT INTO user (email, password) VALUES (?, ?)",
            [data.email, hashed_password],
        )
        conn.commit()

        print(f"User created: {data.email}")
        return {
            "message": "Account created successfully. Please log in.",
            "email": data.email,
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Signup error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"Signup failed: {str(e)}"
        )


@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest, conn: Annotated[libsql.Connection, Depends(get_db)]
):
    """Login user and return token"""
    print(f" Login request for: {data.email}")

    try:

        print("Finding user...")
        user_row = conn.execute(
            "SELECT id, email, password, created_at FROM user WHERE email = ?",
            [data.email],
        ).fetchone()

        if not user_row:
            print(f"User not found: {data.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if isinstance(user_row, dict):
            user = user_row
        else:

            user = {
                "id": user_row[0],
                "email": user_row[1],
                "password": user_row[2],
                "created_at": user_row[3],
            }

        print("Verifying password...")
        if not verify_password(data.password, user["password"]):
            print(f" Password incorrect for: {data.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        print("Creating token...")
        access_token = create_access_token(user["id"], user["email"])

        print(f"Login successful for: {data.email}")
        return TokenResponse(
            access_token=access_token, token_type="bearer", user=UserResponse(**user)
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An internal server error occurred.",
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    token: str, conn: Annotated[libsql.Connection, Depends(get_db)]
):
    """Get current user from token"""
    print(f"Getting current user...")

    try:

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = int(payload.get("sub"))
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication error: {e}")

    user_row = conn.execute(
        "SELECT id, email, created_at FROM user WHERE id = ?", [user_id]
    ).fetchone()

    if user_row is None:
        raise HTTPException(status_code=401, detail="User not found")

    if isinstance(user_row, dict):
        user = user_row
    else:
        user = {"id": user_row[0], "email": user_row[1], "created_at": user_row[2]}

    return UserResponse(**user)
