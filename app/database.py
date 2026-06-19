import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print(f"DEBUG - URL: {SUPABASE_URL}")
print(f"DEBUG - KEY starts with: {SUPABASE_KEY[:10] if SUPABASE_KEY else 'NONE'}")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
