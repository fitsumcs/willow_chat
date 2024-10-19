from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
from config import settings
import random

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

def generate_random_text(word_count=10):
    words = ["apple", "banana", "computer", "flower", "mountain", "river", "sky", "cloud", "tree", "ocean"]
    random_text = ' '.join(random.choice(words) for _ in range(word_count))
    return f"Random response: {random_text}"

@router.post("/chat")
def chat_with_gpt(request: ChatRequest):
    openai.api_key = settings.OPENAI_API_KEY
    try:
        response = openai.Completion.create(
            engine="gpt-4",
            prompt=request.message,
            max_tokens=150
        )
        answer = response.choices[0].text.strip()
        return {"answer": answer, "source": "chatgpt"}
    except Exception as e:
        fallback_text = generate_random_text()
        return {"answer": fallback_text, "source": "non-chatgpt"}
