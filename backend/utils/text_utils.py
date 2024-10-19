import random

def generate_random_text(word_count=10):
    """Generates random words to simulate a fallback message."""
    words = ["apple", "banana", "computer", "flower", "mountain", "river", "sky", "cloud", "tree", "ocean"]
    random_text = ' '.join(random.choice(words) for _ in range(word_count))
    return f"Random response: {random_text}"
