
import fitz
from typing import List, Dict


def extract_text_from_pdf(pdf_path: str) -> str:
    doc = fitz.open(pdf_path)
    full_text = []

    for page in doc:
        full_text.append(page.get_text())

    return "\n".join(full_text).strip()


def extract_images_from_pdf(pdf_path: str) -> List[Dict]:
    doc = fitz.open(pdf_path)
    images = []

    for page_index in range(len(doc)):
        page = doc[page_index]
        image_list = page.get_images(full=True)

        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            images.append({
                "page": page_index + 1,
                "index": img_index + 1,
                "ext": base_image["ext"],
                "image_bytes": base_image["image"]
            })

    return images
