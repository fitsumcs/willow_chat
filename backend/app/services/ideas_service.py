from app.models.idea_model import Idea
from app import db

class IdeasService:
    @staticmethod
    def create_idea(title, content):
        new_idea = Idea(title=title, content=content)
        db.session.add(new_idea)
        db.session.commit()
        return new_idea

    @staticmethod
    def get_all_ideas():
        return Idea.query.all()
