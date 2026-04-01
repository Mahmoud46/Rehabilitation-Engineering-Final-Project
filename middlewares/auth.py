import jwt
from functools import wraps
from flask import request, jsonify, g
from models.User import User  # Replace with your actual user model import
from config.env import ENV   # Replace with your actual config

def protected_route(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('jwt')

        if not token:
            return jsonify({"success": False, "message": "Unauthorized - No Token Provided"}), 401

        try:
            # Verify token
            payload = jwt.decode(token, ENV["JWT_SECRET"], algorithms=["HS256"])
            user_id = payload.get("sub")

            # Assuming an ORM like Flask-MongoEngine or similar
            user = User.find_by_id(user_id)
            
            if not user:
                return jsonify({"success": False, "message": "User not found"}), 404
                # return None

            # Attach user to Flask's global context 'g'
            # 'g' is the standard way to share data across the request lifecycle
            g.user = user

        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "message": "Unauthorized - Token Expired"}), 401
        except (jwt.InvalidTokenError, Exception) as e:
            return jsonify({"success": False, "message": "Unauthorized - Invalid Token"}), 401

        # Move to the next function
        return f(*args, **kwargs)
    
    return decorated_function