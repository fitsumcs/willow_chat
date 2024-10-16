from flask import Blueprint, request, jsonify
from app.services.openai_service import OpenAIService

gpt_bp = Blueprint('gpt_bp', __name__)

@gpt_bp.route('/gpt-response', methods=['POST'])
def get_gpt_response():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        response = OpenAIService.get_gpt_response(prompt)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
