from pydantic import BaseModel
from typing import List, Dict, Any, Optional


class UploadResponse(BaseModel):
    filename: str
    saved_path: str
    file_type: str


class ExtractResponse(BaseModel):
    filename: str
    document_type: str
    extracted_text: str
    tables: List[Dict[str, Any]]
    extracted_images: List[str]
    structured_data: Dict[str, Any]


class InsightResponse(BaseModel):
    filename: str
    summary: str
    keywords: List[str]
    warnings: List[str]
    confidence_score: float


class ChatRequest(BaseModel):
    question: str
    context: str


class ChatResponse(BaseModel):
    answer: str