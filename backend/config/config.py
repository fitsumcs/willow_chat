import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SQLALCHEMY_DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./app.db')
    OPENAPI_API_KEY = os.getenv('OPEN_API_KEY')

settings = Settings()
