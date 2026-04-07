from fastapi import APIRouter, HTTPException
from pathlib import Path

from app.services.pdf_service import extract_text_from_pdf
from app.services.ocr_service import extract_text_from_image
from app.services.classify_service import classify_document
from app.services.insight_service import (
    generate_summary,
    extract_keywords,
    generate_warnings,
    estimate_confidence,
)

router = APIRouter(prefix="/insights", tags=["Insights"])

UPLOAD_DIR = Path("uploads")


@router.get("/{filename}")
def get_document_insights(filename: str):
    file_path = UPLOAD_DIR / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    ext = file_path.suffix.lower()

    if ext == ".pdf":
        text = extract_text_from_pdf(str(file_path))
    elif ext in [".png", ".jpg", ".jpeg"]:
        text = extract_text_from_image(str(file_path))
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    document_type = classify_document(text)
    summary = generate_summary(text)
    keywords = extract_keywords(text)
    warnings = generate_warnings(text)
    confidence_score = estimate_confidence(text)

    return {
        "filename": filename,
        "document_type": document_type,
        "summary": summary,
        "keywords": keywords,
        "warnings": warnings,
        "confidence_score": confidence_score
    }