from sqlalchemy import Column, Integer, String, Text
from database import Base

class Idea(Base):
    __tablename__ = "ideas"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)

class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    conversation = Column(Text)
