import os
import shutil
from pathlib import Path
from fastapi import UploadFile, HTTPException
from app.config import ALLOWED_EXTENSIONS, UPLOAD_DIR


def validate_file_extension(filename: str):
    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {ext}. Allowed: {ALLOWED_EXTENSIONS}"
        )


def save_upload_file(file: UploadFile) -> Path:
    validate_file_extension(file.filename)

    save_path = UPLOAD_DIR / file.filename

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return save_path


def get_file_type(file_path: Path) -> str:
    ext = file_path.suffix.lower()
    if ext == ".pdf":
        return "pdf"
    return "image"