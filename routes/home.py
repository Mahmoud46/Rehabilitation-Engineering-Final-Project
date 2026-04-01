from flask import Blueprint
from controllers.home import home

home_bp = Blueprint("home_bp", __name__)

@home_bp.route('/')
def main():
    return home()