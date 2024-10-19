import openai
from config.config import settings
from utils.text_utils import generate_random_text

def get_gpt_response(prompt: str):
    """Fetches a response from GPT-4 or returns fallback text."""
    openai.api_key = settings.OPEN_API_KEY
    try:
        response = openai.Completion.create(
            engine="gpt-4",
            prompt=prompt,
            max_tokens=150
        )
        answer = response.choices[0].text.strip()
        return {"answer": answer, "source": "chatgpt"}
    except Exception as e:
        fallback_text = generate_random_text()
        return {"answer": fallback_text, "source": "non-chatgpt"}
