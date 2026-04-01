from flask import render_template, request
from models.User import User
import jwt
from config.env import ENV
from utils.helpers import calculate_age
from datetime import datetime

def home():
    token = request.cookies.get('jwt')
    # print(token)
    # print(ENV["JWT_SECRET"])
    if not token:
        return render_template("index.html")
    # Verify token
    payload = jwt.decode(token.encode('utf-8'), ENV["JWT_SECRET"], algorithms=["HS256"])
    user_id = payload.get("sub")
    # Assuming an ORM like Flask-MongoEngine or similar
    user = User.find_by_id(user_id)
    if not user:
        return render_template("index.html")
            
    return render_template("patient.html", user={"first_name":str(user[1]).split(" ")[0], 
                                                 "full_name":user[1], 
                                                 "email":user[4], 
                                                 "username":user[6], 
                                                 "ptsd_score":int(user[9]), 
                                                 "ptsd_impact":str(user[10]).capitalize(), 
                                                 "gender": str(user[3]).capitalize(), 
                                                 "age": calculate_age(datetime.strptime(user[2], "%Y-%m-%d").date())})