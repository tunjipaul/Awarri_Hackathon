from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
import libsql
import os
from dotenv import load_dotenv
from routes.auth import router as auth_router

# Import the new database functions
from database import get_db, init_db

# Load environment variables (ensure this is done once at the top)
load_dotenv()

# --- App Initialization ---
app = FastAPI(title="CivicAccess Backend")

# Initialize the database when the app starts up
@app.on_event("startup")
def on_startup():
    print("🚀 Starting FastAPI app...")
    # Initialize the DB, creating the table if it doesn't exist
    init_db()


# --- CORS Configuration ---
# You need to define your allowed origins here
origins = [
    os.getenv("VITE_BACKEND_URL"), # Your frontend URL, if defined in the env
    "http://localhost:5173",       # Common React dev server
    "http://127.0.0.1:8000",       # Your own backend URL for testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Use "*" for development simplicity, but lock this down in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("✅ CORS configured")

# --- Include the auth router ---
app.include_router(auth_router)  # ADD THIS LINE
# --- Example Route using LibSQL Dependency ---

@app.get("/")
def read_root():
    return {"message": "Welcome to CivicAccess API"}

# Example of a route that uses the Turso connection
@app.get("/interactions/count")
def get_interaction_count(conn: Annotated[libsql.Connection, Depends(get_db)]):
    """
    Retrieves the total count of interactions from the Turso database.
    """
    try:
        result = conn.execute("SELECT COUNT(id) AS count FROM interactions").fetchone()
        return {"total_interactions": result['count']}
    except Exception as e:
        # If the query fails for another reason, catch it
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")

# IMPORTANT: You will need to rewrite any other routes that previously used 
# SQLAlchemy's Session or SessionLocal to now use the 'conn: Annotated[libsql.Connection, Depends(get_db)]' pattern.