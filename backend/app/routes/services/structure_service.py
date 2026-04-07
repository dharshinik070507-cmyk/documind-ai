from typing import Dict, Any, List


def build_structured_output(
    filename: str,
    document_type: str,
    extracted_text: str,
    tables: List[Dict[str, Any]],
    extracted_images: List[str]
) -> Dict[str, Any]:
    return {
        "filename": filename,
        "document_type": document_type,
        "text": extracted_text,
        "tables": tables,
        "images": extracted_images
    }