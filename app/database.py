import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError(f"Missing env vars! URL={SUPABASE_URL}, KEY={SUPABASE_KEY[:10] if SUPABASE_KEY else 'NONE'}")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
