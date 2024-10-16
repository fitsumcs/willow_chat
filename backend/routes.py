from flask import Blueprint, request, jsonify
from app import db
from models import Idea, History
import openai
import os

api_bp = Blueprint('api', __name__)

# Save an idea
@api_bp.route('/api/ideas', methods=['POST'])
def save_idea():
    data = request.json
    new_idea = Idea(title=data['title'], content=data['content'])
    db.session.add(new_idea)
    db.session.commit()
    return jsonify({'message': 'Idea saved successfully!'})

# List all ideas
@api_bp.route('/api/ideas', methods=['GET'])
def list_ideas():
    ideas = Idea.query.all()
    idea_list = [{'id': idea.id, 'title': idea.title, 'content': idea.content} for idea in ideas]
    return jsonify(idea_list)

# Save a history entry
@api_bp.route('/api/history', methods=['POST'])
def save_history():
    data = request.json
    new_history = History(conversation=data['conversation'])
    db.session.add(new_history)
    db.session.commit()
    return jsonify({'message': 'History saved successfully!'})

# List all history
@api_bp.route('/api/history', methods=['GET'])
def list_history():
    history = History.query.all()
    history_list = [{'id': h.id, 'conversation': h.conversation} for h in history]
    return jsonify(history_list)

# Communicate with the ChatGPT API
@api_bp.route('/api/chat', methods=['POST'])
def chat_with_gpt():
    data = request.json
    message = data.get('message')

    if not message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        response = openai.Completion.create(
            engine="gpt-3.5-turbo",
            prompt=message,
            max_tokens=150
        )
        answer = response['choices'][0]['text'].strip()
        return jsonify({'answer': answer})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
