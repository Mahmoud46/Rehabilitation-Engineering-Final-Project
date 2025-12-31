from flask import  Blueprint, render_template

user_bp = Blueprint("user_bp", __name__)

@user_bp.route('/<user_name>')
def user(user_name):
    return render_template('user.html',user_name=user_name)