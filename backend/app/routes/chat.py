from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chat_service import answer_question

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    question: str
    context: str


@router.post("/")
def chat_with_document(payload: ChatRequest):
    answer = answer_question(payload.question, payload.context)
    return {"answer": answer}