from fastapi import APIRouter
from schemas.chat_schema import ChatRequest, ChatResponse
from services.gpt_service import get_gpt_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat_with_gpt(request: ChatRequest):
    return get_gpt_response(request.message)
