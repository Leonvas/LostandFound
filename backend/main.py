from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client
import os

# Load .env regardless of whether it lives next to this file (backend/.env)
# or at the project root (LostandFound/.env) — whichever exists is used.
_here = os.path.dirname(__file__)
_project_root = os.path.dirname(_here)
for _candidate in (os.path.join(_here, ".env"), os.path.join(_project_root, ".env")):
    if os.path.exists(_candidate):
        load_dotenv(_candidate)
        break
else:
    load_dotenv()  # last resort: default lookup from current working directory

app = FastAPI(title="Campus Lost & Found API")

# Vite dev server runs on :3000 per this repo's package.json
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):3000",
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_SECRET_KEY)


class LostReportIn(BaseModel):
    name: str
    category: str | None = None
    color: str | None = None
    brand: str | None = None
    material: str | None = None
    date_lost: str | None = None
    time_range: str | None = None
    building: str | None = None
    sub_location: str | None = None
    internal_identifiers: str | None = None
    wear_marks: str | None = None
    has_photo: bool = False
    photo_url: str | None = None
    user_id: str | None = None  # pass the logged-in user's auth uid from the frontend


class FoundItemIn(BaseModel):
    name: str
    category: str | None = None
    color: str | None = None
    material: str | None = None
    found_location: str | None = None
    custodian: str | None = None
    storage_locker: str | None = None
    verification_level: str | None = None
    photo_url: str | None = None
    identifiers_preview: str | None = None
    building: str | None = None
    user_id: str | None = None

@app.get("/dashboard/stats")
def get_dashboard_stats():
    active = (
        supabase.table("lost_reports").select("id", count="exact")
        .neq("status", "returned").execute()
    )
    matches = (
        supabase.table("lost_reports").select("id", count="exact")
        .eq("status", "match_found").execute()
    )
    returned = (
        supabase.table("lost_reports").select("id", count="exact")
        .eq("status", "returned").execute()
    )
    return {
        "active_reports": active.count or 0,
        "possible_matches": matches.count or 0,
        "returned_items": returned.count or 0,
    }

@app.get("/dashboard/matches")
def get_dashboard_matches():
    """
    Every current possible match across ALL open lost reports x in-custody
    found items, ranked by score. Backs the dashboard's "Possible Matches"
    panel — this is real data from find_all_open_matches(), not a single
    hardcoded pair.
    """
    matches = supabase.rpc("find_all_open_matches", {}).execute()
    return matches.data


@app.get("/")
def home():
    return {"message": "Campus Lost & Found Backend is running!"}


# ---- Found items (what BrowseItemsScreen lists) ----

@app.get("/found-items")
def list_found_items():
    response = (
        supabase.table("found_items")
        .select("*")
        .eq("status", "in_custody")
        .order("found_at", desc=True)
        .execute()
    )
    return response.data


@app.post("/found-items")
def create_found_item(item: FoundItemIn):
    response = supabase.table("found_items").insert(item.model_dump()).execute()
    new_item = response.data[0]

    # Check if this newly found item matches any open lost report
    matches = supabase.rpc(
        "find_matches_for_found", {"item_id": new_item["id"]}
    ).execute()

    return {"item": new_item, "matches": matches.data}


# ---- Lost reports (what ReportScreen submits) ----

@app.post("/lost-reports")
def create_lost_report(report: LostReportIn):
    response = supabase.table("lost_reports").insert(report.model_dump()).execute()
    new_report = response.data[0]

    # Immediately check for matches against items already in custody
    matches = supabase.rpc(
        "find_matches_for_lost", {"report_id": new_report["id"]}
    ).execute()

    return {"report": new_report, "matches": matches.data}


@app.get("/lost-reports/{report_id}")
def get_lost_report(report_id: str):
    response = (
        supabase.table("lost_reports")
        .select("*")
        .eq("id", report_id)
        .single()
        .execute()
    )
    return response.data


@app.get("/lost-reports/{report_id}/matches")
def get_matches_for_lost_report(report_id: str):
    matches = supabase.rpc("find_matches_for_lost", {"report_id": report_id}).execute()
    return matches.data

@app.get("/verification-fields")
def get_verification_fields(category: str):
    rows = (supabase.table("category_verification_fields")
            .select("field_key,label,field_type,weight")
            .eq("category", category).execute().data)
    if not rows:
        rows = (supabase.table("category_verification_fields")
                .select("field_key,label,field_type,weight")
                .eq("category", "default").execute().data)
    return rows

@app.get("/found-items/{item_id}/verification-schema")
def get_item_verification_schema(item_id: str):
    item = supabase.table("found_items").select("category").eq("id", item_id).single().execute().data
    return get_verification_fields(item["category"])

class VerifyClaimIn(BaseModel):
    lost_report_id: str
    found_item_id: str
    claimant_user_id: str | None = None
    answers: dict[str, str]

from difflib import SequenceMatcher

def similarity(a: str, b: str) -> float:
    a, b = (a or "").strip().lower(), (b or "").strip().lower()
    return SequenceMatcher(None, a, b).ratio() if a and b else 0.0

@app.post("/verify-claim")
def verify_claim(payload: VerifyClaimIn):
    item = (supabase.table("found_items").select("private_attributes,category")
            .eq("id", payload.found_item_id).single().execute().data)
    if not item:
        raise HTTPException(404, "Found item not found")

    schema = (supabase.table("category_verification_fields")
              .select("field_key,weight").eq("category", item["category"]).execute().data)
    private = item.get("private_attributes") or {}

    field_scores, weighted_sum, weight_total = {}, 0.0, 0
    for f in schema:
        truth = private.get(f["field_key"])
        if not truth:
            continue  # finder left this one blank — don't penalize claimant for it
        score = similarity(truth, payload.answers.get(f["field_key"], ""))
        field_scores[f["field_key"]] = round(score, 2)
        weighted_sum += score * f["weight"]
        weight_total += f["weight"]

    overall = round(weighted_sum / weight_total, 2) if weight_total else 0.0
    critical_fail = any(s < 0.3 for s in field_scores.values())
    passed = overall >= 0.65 and not critical_fail

    supabase.table("verification_attempts").insert({
        "lost_report_id": payload.lost_report_id,
        "found_item_id": payload.found_item_id,
        "claimant_user_id": payload.claimant_user_id,
        "answers": payload.answers,
        "field_scores": field_scores,
        "overall_score": overall,
        "passed": passed,
    }).execute()

    if passed:
        supabase.table("found_items").update(
            {"status": "claimed", "matched_report_id": payload.lost_report_id}
        ).eq("id", payload.found_item_id).execute()

    return {"passed": passed, "overall_score": overall, "field_scores": field_scores}

@app.get("/found-items/{item_id}")
def get_found_item(item_id: str):
    response = (
        supabase.table("found_items")
        .select("*")
        .eq("id", item_id)
        .single()
        .execute()
    )
    return response.data


@app.get("/found-items/{item_id}/matches")
def get_matches_for_found_item(item_id: str):
    matches = supabase.rpc("find_matches_for_found", {"item_id": item_id}).execute()
    return matches.data


@app.get("/my-reports/{user_id}")
def get_my_reports(user_id: str):
    response = (
        supabase.table("lost_reports")
        .select("*")
        .eq("user_id", user_id)
        .order("reported_at", desc=True)
        .execute()
    )
    return response.data