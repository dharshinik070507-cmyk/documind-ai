from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path

from app.services.pdf_service import extract_text_from_pdf, extract_images_from_pdf
from app.services.ocr_service import extract_text_from_image
from app.services.image_service import save_extracted_images
from app.services.table_service import extract_tables_from_pdf
from app.utils.export_utils import export_to_json, export_tables_to_excel, get_clean_name

router = APIRouter(prefix="/extract", tags=["Extract"])

UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
IMAGE_DIR = Path("extracted_images")


@router.get("/{filename}")
def extract_document(filename: str):
    file_path = UPLOAD_DIR / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    ext = file_path.suffix.lower()

    extracted_images = []
    tables = []
    extracted_text = ""
    file_type = ""

    if ext == ".pdf":
        extracted_text = extract_text_from_pdf(str(file_path))
        raw_images = extract_images_from_pdf(str(file_path))
        saved_image_paths = save_extracted_images(filename, raw_images)

        # Store only image file names for frontend display/download
        extracted_images = [Path(img).name for img in saved_image_paths]

        tables = extract_tables_from_pdf(str(file_path))
        file_type = "pdf"

    elif ext in [".png", ".jpg", ".jpeg"]:
        extracted_text = extract_text_from_image(str(file_path))
        file_type = "image"

    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    structured_data = {
        "filename": filename,
        "file_type": file_type,
        "text": extracted_text,
        "images": extracted_images,
        "tables": tables,
    }

    json_path = export_to_json(filename, structured_data)
    excel_path = export_tables_to_excel(filename, tables)

    return {
        "filename": filename,
        "file_type": file_type,
        "extracted_text": extracted_text,
        "extracted_images": extracted_images,
        "tables": tables,
        "json_output": json_path,
        "excel_output": excel_path,
    }


@router.get("/download/json/{filename}")
def download_json(filename: str):
    clean_name = get_clean_name(filename)
    json_file = OUTPUT_DIR / f"{clean_name}.json"

    if not json_file.exists():
        raise HTTPException(status_code=404, detail="JSON file not found")

    return FileResponse(
        path=str(json_file),
        filename=json_file.name,
        media_type="application/json",
    )


@router.get("/download/excel/{filename}")
def download_excel(filename: str):
    clean_name = get_clean_name(filename)
    excel_file = OUTPUT_DIR / f"{clean_name}_tables.xlsx"

    if not excel_file.exists():
        raise HTTPException(status_code=404, detail="Excel file not found")

    return FileResponse(
        path=str(excel_file),
        filename=excel_file.name,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@router.get("/image/{image_name}")
def get_image(image_name: str):
    image_path = IMAGE_DIR / image_name

    if not image_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")

    return FileResponse(str(image_path))