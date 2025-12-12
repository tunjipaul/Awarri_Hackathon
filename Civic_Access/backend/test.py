# --- CONFIGURATION ---
TURSO_URL = os.getenv("TURSO_URL")
TURSO_TOKEN = os.getenv("TURSO_TOKEN")


def get_db_connection():
    """Establishes a connection to the Turso remote database."""
    if not TURSO_URL or not TURSO_TOKEN:
        print("--- Error: TURSO_URL or TURSO_TOKEN missing in .env ---")
        return None
        
    try:
        # Connect to Turso using the sync client
        conn = libsql.connect(TURSO_URL, auth_token=TURSO_TOKEN)
        return conn
    except Exception as e:
        print(f"--- Turso Connection Error: {e} ---")
        return None

def init_db():
    """Creates the table in Turso if it doesn't exist."""
    conn = get_db_connection()
    if not conn:
        return

    try:
        # Note: We use conn.execute() directly for libsql
        conn.execute('''
            CREATE TABLE IF NOT EXISTS interactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                user_query TEXT,
                target_lang TEXT,
                rag_context TEXT,
                model_reply TEXT,
                judge_score INTEGER,
                judge_reason TEXT,
                status TEXT DEFAULT 'pending'
            )
        ''')
        conn.commit()
        print("--- Database Initialized on Turso ---")
    except Exception as e:
        print(f"--- DB Init Error: {e} ---")