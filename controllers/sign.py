from flask import  Blueprint, make_response, jsonify, request
from services.login import login_validate
from services.regestration import regestration_validation, user_regestration

sign_bp = Blueprint("sign_bp", __name__)

@sign_bp.route('/user_sign', methods=['POST'])
def get_request():
    req = request.get_json()
    reg_valid=False
    user_reg=False
    login_valid=False
    username=''
    if(req['sign_stat']=='reg'):
        if(req['user_date']['ptsd_score']!=0 and req['user_date']['ptsd_score']!=''):
            user_reg_info=user_regestration(req['user_date'])
            user_reg=user_reg_info['user_reg']
            username=user_reg_info['username']
        else:
            reg_valid=regestration_validation(req['user_date'])
    else:
        login_valid_info=login_validate(req['user_date'])
        login_valid=login_valid_info['login_valid']
        username=login_valid_info['username']

    res = make_response(
        jsonify({'Message': "Transformation has been done successfully",'reg_valid':reg_valid,'user_reg':user_reg,'login_valid':login_valid,"username":username}), 200)
    return res



