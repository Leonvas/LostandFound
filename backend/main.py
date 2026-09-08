from fastapi import FastAPI
from dotenv import load_dotenv
from supabase import create_client
import os

load_dotenv()

app = FastAPI()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY
)


@app.get("/")
def home():
    return {
        "message": "Campus Lost & Found Backend is running!"
    }


@app.get("/items")
def get_items():
    response = supabase.table("items").select("*").execute()

    return response.data


@app.post("/items")
def create_item(item: dict):
    response = supabase.table("items").insert(item).execute()

    return response.data