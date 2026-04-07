import re
from collections import Counter
from typing import List


def generate_summary(text: str) -> str:
    sentences = [s.strip() for s in text.split(".") if s.strip()]
    if not sentences:
        return "No summary available."
    return ". ".join(sentences[:3])


def extract_keywords(text: str, top_n: int = 8) -> List[str]:
    words = re.findall(r"\b[a-zA-Z]{4,}\b", text.lower())

    stopwords = {
        "this", "that", "with", "from", "have", "were", "been", "their",
        "there", "about", "which", "into", "also", "will", "shall",
        "they", "them", "than", "then", "such", "using", "used"
    }

    filtered = [w for w in words if w not in stopwords]
    common = Counter(filtered).most_common(top_n)

    return [word for word, _ in common]


def generate_warnings(text: str) -> List[str]:
    warnings = []
    lower_text = text.lower()

    if len(text.strip()) < 50:
        warnings.append("Very low extracted text. OCR or parsing quality may be poor.")

    if "invoice" in lower_text and "total" not in lower_text:
        warnings.append("Invoice-related content detected, but total amount not clearly found.")

    if "signature" not in lower_text:
        warnings.append("Signature keyword not detected.")

    return warnings


def estimate_confidence(text: str) -> float:
    if not text.strip():
        return 0.0

    length_score = min(len(text) / 1000, 1.0)
    confidence = 0.55 + (0.45 * length_score)

    return round(confidence, 2)