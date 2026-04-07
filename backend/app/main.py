import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routes.upload import router as upload_router
from app.routes.extract import router as extract_router
from app.routes.insights import router as insights_router
from app.routes.chat import router as chat_router

load_dotenv()

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

app = FastAPI(
    title="DocuMind AI",
    description="AI-powered Intelligent Document Processing platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(extract_router)
app.include_router(insights_router)
app.include_router(chat_router)


@app.get("/")
def home():
    return {
        "message": "DocuMind AI backend is running",
        "status": "ok"
    }