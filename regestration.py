from storage_control import check_user_db_by_email,save_new_user
from random import randint

def regestration_validation(reg_data):
    return not check_user_db_by_email(reg_data['email'])

def user_regestration(reg_data):
    username=create_username(reg_data["full_name"],reg_data["email"])
    save_new_user(reg_data,username)
    return {'user_reg':True,'username':username}

def create_username(fullname, email):
    email_username = email.split('@')[0]  
    email_username_cleaned = ''.join(c for c in email_username if c.isalnum()).lower() 
    first_name = fullname.split()[0]  
    username = first_name + '_' + email_username_cleaned 
    username = f"{first_name}_{email_username_cleaned}_{randint(0,100000)}" 
    return username

