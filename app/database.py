import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SECRET_KEY")  # use secret key for backend

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
