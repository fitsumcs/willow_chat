from flask import Blueprint, request, jsonify
from app.services.ideas_service import IdeasService

ideas_bp = Blueprint('ideas_bp', __name__)

@ideas_bp.route('/', methods=['GET'])
def list_ideas():
    ideas = IdeasService.get_all_ideas()
    return jsonify([{"id": idea.id, "title": idea.title, "content": idea.content} for idea in ideas])

@ideas_bp.route('/', methods=['POST'])
def save_idea():
    data = request.json
    title = data.get('title')
    content = data.get('content')
    idea = IdeasService.create_idea(title, content)
    return jsonify({"message": "Idea saved", "idea": {"id": idea.id, "title": idea.title, "content": idea.content}})
