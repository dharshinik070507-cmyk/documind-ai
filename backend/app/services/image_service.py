from pathlib import Path
from typing import List, Dict

EXTRACTED_IMAGES_DIR = Path("extracted_images")
EXTRACTED_IMAGES_DIR.mkdir(exist_ok=True)


def save_extracted_images(filename: str, images: List[Dict]) -> List[str]:
    saved_paths = []
    stem = Path(filename).stem

    for img in images:
        page = img["page"]
        index = img["index"]
        ext = img["ext"]
        image_bytes = img["image_bytes"]

        save_path = EXTRACTED_IMAGES_DIR / f"{stem}_page{page}_img{index}.{ext}"

        with open(save_path, "wb") as f:
            f.write(image_bytes)

        saved_paths.append(str(save_path))

    return saved_paths
