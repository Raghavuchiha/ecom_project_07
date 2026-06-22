from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas import UserOut, UserAuth, TokenSchema
from app.utils import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password,
    decode_access_token,
    oauth2_scheme
)
from app.database import supabase
from uuid import uuid4

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ecom-project-07.vercel.app",
        "https://yokaiecom.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/signup', summary="Create new user", response_model=UserOut)
async def create_user(data: UserAuth):
    existing_user = supabase.table("users").select("*").eq("email", data.email).execute()

    if existing_user.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exist"
        )

    user = {
        "id": str(uuid4()),
        "email": data.email,
        "password": get_hashed_password(data.password),
        "username": data.username
    }

    supabase.table("users").insert(user).execute()

    # auto-create empty profile row for this user
    supabase.table("profiles").insert({"user_id": user["id"]}).execute()

    return UserOut(id=user["id"], email=user["email"], username=user["username"])


@app.post('/login', summary="Create access and refresh tokens for user", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    result = supabase.table("users").select("*").eq("email", form_data.username).execute()

    if not result.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found!")

    user = result.data[0]

    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    return {
        "access_token": create_access_token(user["email"]),
        "refresh_token": create_refresh_token(user["email"]),
    }


@app.get("/users", response_model=list[UserOut])
async def get_users():
    result = supabase.table("users").select("id, username, email").execute()
    return result.data


@app.get("/me", response_model=UserOut)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    result = supabase.table("users").select("id, username, email").eq("email", email).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="User not found")

    return result.data[0]


@app.get("/profile")
async def get_profile(token: str = Depends(oauth2_scheme)):
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_result = supabase.table("users").select("id").eq("email", email).execute()
    if not user_result.data:
        raise HTTPException(status_code=404, detail="User not found")

    user_id = user_result.data[0]["id"]

    profile_result = supabase.table("profiles").select("*").eq("user_id", user_id).execute()

    if not profile_result.data:
        return {
            "user_id": user_id,
            "full_name": None,
            "phone": None,
            "date_of_birth": None,
            "gender": None,
            "avatar_url": None
        }

    return profile_result.data[0]


@app.patch("/profile")
async def update_profile(data: dict, token: str = Depends(oauth2_scheme)):
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_result = supabase.table("users").select("id").eq("email", email).execute()
    if not user_result.data:
        raise HTTPException(status_code=404, detail="User not found")

    user_id = user_result.data[0]["id"]

    result = supabase.table("profiles").upsert({
        "user_id": user_id,
        **data
    }).execute()

    return result.data[0]
