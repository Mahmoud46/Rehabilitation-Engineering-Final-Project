import jwt
from flask import make_response, jsonify, current_app
import datetime

def generate_token(user_id, initial_payload=None):
    # Generate the JWT
    exp = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
    token_payload = {
        'exp': exp,
        'iat': datetime.datetime.now(datetime.timezone.utc),
        'sub': str(user_id)
    }
    token = jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')

    # Create an initial response (defaulting to an empty JSON if none provided)
    body = initial_payload if initial_payload else {}
    response = make_response(jsonify(body))

    # Attach the secure cookie
    response.set_cookie(
        'jwt',
        token,
        httponly=True,
        secure=True, # Set to False for local non-HTTPS dev
        samesite='Strict',
        max_age=86400 
    )
    
    return response