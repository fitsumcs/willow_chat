from flask import Blueprint, request, jsonify
from app.services.history_service import HistoryService

history_bp = Blueprint('history_bp', __name__)

@history_bp.route('/', methods=['GET'])
def list_history():
    history = HistoryService.get_all_history()
    return jsonify([{"id": hist.id, "conversation": hist.conversation} for hist in history])

@history_bp.route('/', methods=['POST'])
def save_history():
    data = request.json
    conversation = data.get('conversation')
    history = HistoryService.create_history(conversation)
    return jsonify({"message": "History saved", "history": {"id": history.id, "conversation": history.conversation}})
