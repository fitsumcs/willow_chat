from app import db

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conversation = db.Column(db.Text, nullable=False)
