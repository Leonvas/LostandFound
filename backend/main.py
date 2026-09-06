from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Literal, List
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client, Client
import os
 
load_dotenv()
 
app = FastAPI(title="Campus Lost & Found API")
 
# Allow your frontend to call this API during development.
# Tighten allow_origins to your actual frontend URL before deploying.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
 
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")
 
if not SUPABASE_URL or not SUPABASE_SECRET_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_SECRET_KEY must be set in your .env file")
 
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SECRET_KEY)
 
 
# ---------- Models (mirrors the `items` table exactly) ----------
 
ItemType = Literal["lost", "found"]
ItemStatus = Literal["active", "matched", "returned", "closed"]
 
 
class ItemCreate(BaseModel):
    # user_id must reference an existing row in `profiles`.
    # Once auth is wired up, this should come from the verified session
    # instead of the request body.
    user_id: str
    type: ItemType
    name: str
    category: str
    location: str
    date_time: datetime
    color: Optional[str] = None
    brand: Optional[str] = None
    description: Optional[str] = None
    unique_features: Optional[str] = None
    image_url: Optional[str] = None
    status: ItemStatus = "active"
 
 
class ItemResponse(ItemCreate):
    id: int
    created_at: datetime
 
 
# ---------- Routes ----------
 
@app.get("/")
def home():
    return {"message": "Campus Lost & Found Backend is running!"}
 
 
@app.get("/items", response_model=List[ItemResponse])
def get_items(
    type: Optional[ItemType] = Query(None, description="Filter by 'lost' or 'found'"),
    category: Optional[str] = Query(None, description="Filter by category"),
    status: Optional[ItemStatus] = Query(None, description="Filter by status"),
    location: Optional[str] = Query(None, description="Partial match on location"),
):
    query = supabase.table("items").select("*")
 
    if type:
        query = query.eq("type", type)
    if category:
        query = query.eq("category", category)
    if status:
        query = query.eq("status", status)
    if location:
        query = query.ilike("location", f"%{location}%")
 
    try:
        response = query.order("created_at", desc=True).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch items: {e}")
 
    return response.data
 
 
@app.get("/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: int):
    try:
        response = supabase.table("items").select("*").eq("id", item_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch item: {e}")
 
    if not response.data:
        raise HTTPException(status_code=404, detail="Item not found")
 
    return response.data[0]
 
 
@app.post("/items", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate):
    # Pydantic already enforces required fields (type, name, category,
    # location, date_time) and the allowed values for `type`/`status`,
    # matching the CHECK constraints in the table.
    payload = item.model_dump(mode="json")
 
    try:
        response = supabase.table("items").insert(payload).execute()
    except Exception as e:
        # Most commonly this will fire if user_id doesn't exist in `profiles`
        # (foreign key violation) — surfaced here as a 400 instead of a 500.
        raise HTTPException(status_code=400, detail=f"Failed to create item: {e}")
 
    if not response.data:
        raise HTTPException(status_code=400, detail="Item could not be created")
 
    return response.data[0]