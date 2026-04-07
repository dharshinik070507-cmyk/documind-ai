from fastapi import APIRouter, UploadFile, File
import shutil
from pathlib import Path

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/")
async def upload_document(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "saved_path": str(file_path),
        "file_type": "pdf" if file.filename.lower().endswith(".pdf") else "image"
    }