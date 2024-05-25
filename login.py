from storage_control import get_user_data_by_email_and_password

def login_validate(login_data):
    [login_valid,user]=get_user_data_by_email_and_password(login_data['email'],login_data['password'])
    if login_data:
        return {'login_valid':login_valid,"username": user['username']}
    return {'login_valid':login_valid,"username": ''}