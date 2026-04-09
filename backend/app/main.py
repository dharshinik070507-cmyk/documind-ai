from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.extract import router as extract_router
from app.routes.insights import router as insights_router
from app.routes.chat import router as chat_router

app = FastAPI(
    title="DocuMind AI",
    description="AI-powered Intelligent Document Processing platform",
    version="1.0.0"
)

# OPEN CORS FOR DEMO / PRESENTATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
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