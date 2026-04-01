from flask import jsonify, json, request, make_response
from utils.generate_token import generate_token
from models.User import User
from models.File import File
from models.Assessment import Assessment
import bcrypt
import re
from nanoid import generate
from datetime import datetime
from config.paths import GENERATED_DIR

def signup():
    data = request.get_json()
    
    try:
        if not data or 'email' not in data or 'password' not in data or 'full_name' not in data: 
            return jsonify({ "success": False, "message": "Please provide all required fields." }), 400
        
        email = data['email']
        password = data['password']
        full_name = data['full_name']
        gender = data['gender']
        birth_date = data['birth_date']
        ptsd_score = data['ptsd_score']
        ptsd_impact = data['ptsd_impact']
        ptsd_test = data['ptsd_test']

        
        email_regex = r"^\S+@\S+\.\S+$"
        if not re.match(email_regex, email):
            return jsonify({ "success": False, "message": "Invalid email format." }), 400
        
        existing_user = User.find_by_email(email)
        if existing_user:
            return jsonify({ "success": False, "message": "Email already in use." }), 409
        
        # First step
        if not len(ptsd_test):
            return jsonify({ "success": True, "message": "Continue signup." }), 200
        
        # Generate 'salt'
        salt = bcrypt.gensalt(10)
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)

        new_user = User.insert(full_name=full_name, birth_date=birth_date, gender=str(gender).lower(), email=email, username=f'{str("_".join(str(full_name).split(" "))).lower()}_{generate(size=5)}', password_hash=password_hash, role= "patient", latest_ptsd_score=ptsd_score, latest_ptsd_impact=str(ptsd_impact).lower())

        if new_user:
            print(new_user)
            # Patient user
            if new_user[7] == "patient":
                print(new_user[7])
                assessment = Assessment.insert(user_id=new_user[0], ptsd_score=ptsd_score, ptsd_impact=str(ptsd_impact).lower(), questions=ptsd_test)
                
                if assessment:
                    User.update(new_user[0], latest_assessment_id=assessment[0], latest_ptsd_score=ptsd_score, latest_ptsd_impact=str(ptsd_impact).lower())
                    
                    file_title = f'{(datetime.strptime(assessment[1], "%Y-%m-%d %H:%M:%S")).strftime("%Y%m%d")}_{new_user[0]}_PCL22_Baseline.pdf'
                    
                    file = File.insert(user_id=new_user[0], assessment_id=assessment[0], title=file_title, type="medical_report", file_type="application/pdf", url=f'{GENERATED_DIR}/{file_title}')
                    
                    if file:
                        print("Done")

            response = generate_token(new_user[0])
            response.set_data(json.dumps({
                "success": True,
                "message": "Account created successfully! Welcome aboard.",
            }))

            return response, 201

    except Exception as e:
        # Log the error internally, return generic error to client
        print(e)
        return jsonify({ "success": False,"message": "Server error during signup"}), 500

def login():
    data = request.get_json()
    
    try:
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({ "success": False, "message": "Please provide email and password" }), 400
        
        email = data['email']
        password = data['password']

        print(password)

        # Find user in database
        user = User.find_by_email(email)
        
        if not user:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

        # Verify password hash
        is_password_correct = bcrypt.checkpw(password.encode('utf-8'), user[5])

        if not is_password_correct:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401
        
        response = generate_token(user[0])

        response.set_data(json.dumps({
            "success": True,
            "message": f"Welcome back, {user[1]}",
        }))
        return response, 200
        
            
    except Exception as e:
        print(e)
        return jsonify({ "success": False,"message": "Server error during login"}), 500
    
def logout():
    try:
        # Create a JSON response
        response = make_response(jsonify({"message": "Logged out successfully"}))
        
        # Clear the 'jwt' cookie
        # Setting max_age=0 tells the browser to delete the cookie immediately
        response.set_cookie(
            'jwt',
            "",
            httponly=True,
            secure=True, # Set to False for local non-HTTPS dev
            samesite='Strict',
            max_age=0 
        )
        
        return response, 200
        
    except Exception as e:
        print(e)
        return jsonify({ "success": False,"message": "Server error during logout"}), 500
