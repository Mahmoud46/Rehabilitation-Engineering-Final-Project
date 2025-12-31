from flask import  Blueprint, make_response, jsonify, request
from services.storage_control import get_user_data_by_username

user_data_bp = Blueprint("user_data_bp", __name__)

@user_data_bp.route('/get_user_data', methods=['POST'])
def get_user_data():
    req = request.get_json()

    res = make_response(
        jsonify({'Message': "Transformation has been done successfully",'user_data':get_user_data_by_username(req['username'])}), 200)
    return res