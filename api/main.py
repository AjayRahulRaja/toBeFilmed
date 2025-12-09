from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Screenwriter AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel
from services.tmdb import search_movies
from services.similarity import check_originality
from services.generator import generate_storyboard, generate_video, generate_query_letter
from services.analyzer import analyze_script

class SynopsisRequest(BaseModel):
    title: str
    synopsis: str

class SceneRequest(BaseModel):
    scene_text: str

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Screenwriter AI Backend Running"}

@app.post("/api/check-originality")
def check_synopsis(request: SynopsisRequest):
    # 1. Extract keywords (simple approach: use title + first sentence)
    # In a real app, we'd use an LLM to extract keywords
    search_query = request.title
    
    # 2. Search TMDB
    candidates = search_movies(search_query)
    candidate_overviews = [m.get("overview", "") for m in candidates]
    
    # 3. Check Similarity
    score, match_text = check_originality(request.synopsis, candidate_overviews)
    
    return {
        "score": score, # 0.0 to 1.0
        "is_blocked": score > 0.7,
        "match_text": match_text,
        "candidates_found": len(candidates)
    }

@app.post("/api/generate-storyboard")
def api_generate_storyboard(request: SceneRequest):
    return generate_storyboard(request.scene_text)

@app.post("/api/generate-video")
def api_generate_video(request: SceneRequest):
    return generate_video(request.scene_text)

@app.post("/api/generate-query")
def api_generate_query(request: SynopsisRequest):
    letter = generate_query_letter(request.synopsis, request.title)
    return {"letter": letter}

@app.post("/api/analyze-script")
def api_analyze_script(request: SceneRequest): 
    # Re-using SceneRequest {scene_text: str} for full script text to simplify
    data = analyze_script(request.scene_text)
    return data

