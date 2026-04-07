from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

UPLOAD_DIR = BASE_DIR / "uploads"
OUTPUT_DIR = BASE_DIR / "outputs"
EXTRACTED_IMAGES_DIR = BASE_DIR / "extracted_images"

ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg"}

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
EXTRACTED_IMAGES_DIR.mkdir(parents=True, exist_ok=True)