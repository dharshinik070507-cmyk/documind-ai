def classify_document(text: str) -> str:
    lower_text = text.lower()

    if "invoice" in lower_text or "bill" in lower_text:
        return "Invoice"
    if "resume" in lower_text or "education" in lower_text or "skills" in lower_text:
        return "Resume"
    if "bank" in lower_text or "account" in lower_text or "transaction" in lower_text:
        return "Bank Document"
    if "medical" in lower_text or "patient" in lower_text or "diagnosis" in lower_text:
        return "Medical Document"
    if "algorithm" in lower_text or "computer science" in lower_text or "data structure" in lower_text:
        return "Academic Document"

    return "General Document"
