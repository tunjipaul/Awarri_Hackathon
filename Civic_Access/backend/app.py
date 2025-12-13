from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
import libsql
import os
from dotenv import load_dotenv
from routes.auth import router as auth_router


from database import get_db, init_db


load_dotenv()


app = FastAPI(title="CivicAccess Backend")


@app.on_event("startup")
def on_startup():
    print("Starting FastAPI app...")

    init_db()


origins = [
    os.getenv("VITE_BACKEND_URL"),
    "http://localhost:5173",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("CORS configured")


app.include_router(auth_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to CivicAccess API"}


@app.get("/interactions/count")
def get_interaction_count(conn: Annotated[libsql.Connection, Depends(get_db)]):
    """
    Retrieves the total count of interactions from the Turso database.
    """
    try:
        result = conn.execute("SELECT COUNT(id) AS count FROM interactions").fetchone()
        return {"total_interactions": result["count"]}
    except Exception as e:

        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
