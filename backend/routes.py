from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Idea, History
from database import get_db
import openai
from config import settings
import random

router = APIRouter()

# Function to generate random words or sentences
def generate_random_text(word_count=10):
    """Generates random words to simulate a fallback message."""
    words = ["apple", "banana", "computer", "flower", "mountain", "river", "sky", "cloud", "tree", "ocean"]
    random_text = ' '.join(random.choice(words) for _ in range(word_count))
    return f"Random response: {random_text}"

# Function to generate random characters (random gibberish)
def generate_random_gibberish(length=50):
    """Generates a random string of characters as fallback text."""
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

# List all ideas
@router.get("/ideas")
def list_ideas(db: Session = Depends(get_db)):
    ideas = db.query(Idea).all()
    return ideas

# Save an idea
@router.post("/ideas")
def save_idea(title: str, content: str, db: Session = Depends(get_db)):
    new_idea = Idea(title=title, content=content)
    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)
    return new_idea

# List history
@router.get("/history")
def list_history(db: Session = Depends(get_db)):
    history = db.query(History).all()
    return history

# Save a history conversation
@router.post("/history")
def save_history(conversation: str, db: Session = Depends(get_db)):
    new_history = History(conversation=conversation)
    db.add(new_history)
    db.commit()
    db.refresh(new_history)
    return new_history

# ChatGPT Communication with fallback to random text
@router.post("/chat")
def chat_with_gpt(message: str):
    openai.api_key = settings.OPENAI_API_KEY
    try:
        # Attempt to get a response from ChatGPT
        response = openai.Completion.create(
            engine="gpt-4",
            prompt=message,
            max_tokens=150
        )
        answer = response.choices[0].text.strip()
        return {"answer": answer, "source": "chatgpt"}

    except Exception as e:
        # In case of an error, generate random text as a fallback
        fallback_text = generate_random_text()  # Generate random words as the response
        return {"answer": fallback_text, "source": "non-chatgpt"}

