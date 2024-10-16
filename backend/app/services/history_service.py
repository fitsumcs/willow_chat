from app.models.history_model import History
from app import db

class HistoryService:
    @staticmethod
    def create_history(conversation):
        new_history = History(conversation=conversation)
        db.session.add(new_history)
        db.session.commit()
        return new_history

    @staticmethod
    def get_all_history():
        return History.query.all()
