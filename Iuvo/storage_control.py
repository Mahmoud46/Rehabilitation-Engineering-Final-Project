import json
from datetime import datetime

def check_user_db_by_email(email):
    with open('./static/db/data.json', 'r') as file:
        data_loaded = json.load(file)
    
    for user in data_loaded:
        if(user['email']==email): return True

    return False

def get_user_data_by_email_and_password(email,password):
    with open('./static/db/data.json', 'r') as file:
        data_loaded = json.load(file)
    
    for user in data_loaded:
        if(user['email']==email and user['password']==password): return [True,user]

    return [False,{}]

def save_new_user(user_info,username):
    new_user=create_new_user(user_info,username)
    data_list=get_data_storage()
    data_list.append(new_user)
    update_data_storage(data_list)
    return


def create_new_user(user_info,username):
    return {
        "full_name": user_info['full_name'],
        "email": user_info['email'],
        "password": user_info['password'],
        "gender": user_info['gender'],
        "birth_date": user_info['birth_date'],
        "ptsd_score": user_info['ptsd_score'],
        "ptsd_impact": user_info['ptsd_impact'],
        "username": username,
        "age":calculate_age( user_info['birth_date']),
        "ptsd_test":user_info["ptsd_test"],
        "reg_date":get_todays_date(),
        'drs_contact_list':[],
        "ptsd_test_date":user_info["ptsd_test_date"]
    }

def get_data_storage():
    data_list=[]
    with open('./static/db/data.json', 'r') as file:
        data_loaded = json.load(file)

    for user in data_loaded:
        data_list.append(user)
    return data_list

def update_data_storage(data_list):
    with open('./static/db/data.json', 'w') as file:
        json.dump(data_list, file, indent=4)

def get_user_data_by_username(username):
    data_list=get_data_storage()
    for user in data_list:
        if user['username']==username:
            return user
    return {}

def calculate_age(birthdate):
    birth_date = datetime.strptime(birthdate, "%Y-%m-%d")
    today = datetime.now()

    age = today.year - birth_date.year
    month_difference = today.month - birth_date.month

    # If this year's birthday has not occurred yet, subtract one year
    if month_difference < 0 or (month_difference == 0 and today.day < birth_date.day):
        age -= 1
    return age

def get_todays_date():
    return datetime.now().strftime("%Y-%m-%d")
