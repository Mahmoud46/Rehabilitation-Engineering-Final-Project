from flask import Blueprint
from controllers.auth import signup, login, logout

# Blueprints
signup_bp = Blueprint("signup_bp", __name__)

login_bp = Blueprint("login_bp", __name__)

logout_bp = Blueprint("logout_bp", __name__)

# Routes
@signup_bp.route('/api/auth/signup', methods=['POST'])
def auth_signup():
    return signup()

@login_bp.route('/api/auth/login', methods=['POST'])
def auth_login():
    return login()

@logout_bp.route('/api/auth/logout', methods=['POST'])
def auth_logout():
    return logout()
