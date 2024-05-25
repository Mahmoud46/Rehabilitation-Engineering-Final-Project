from flask import Flask, make_response, render_template, jsonify, request,redirect
from login import login_validate
from regestration import regestration_validation,user_regestration
from storage_control import get_user_data_by_username
from report_pdf import convert_images_to_pdf
from random import randint
import base64


app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/<user_name>')
def user(user_name):
    return render_template('user_page.html',user_name=user_name)

@app.route('/get_user_data', methods=['GET', 'POST'])
def get_user_data():
    if request.method == "POST":
        req = request.get_json()

        res = make_response(
            jsonify({'Message': "Transformation has been done successfully",'user_data':get_user_data_by_username(req['username'])}), 200)
        return res


@app.route('/user_sign', methods=['GET', 'POST'])
def get_request():
    if request.method == "POST":
        req = request.get_json()
        reg_valid=False
        user_reg=False
        login_valid=False
        username=''
        if(req['sign_stat']=='reg'):
            if(req['user_date']['ptsd_score']!=0 and req['user_date']['ptsd_score']!=''):
                user_reg_info=user_regestration(req['user_date'])
                user_reg=user_reg_info['user_reg']
                username=user_reg_info['username']
            else:
                reg_valid=regestration_validation(req['user_date'])
        else:
            login_valid_info=login_validate(req['user_date'])
            login_valid=login_valid_info['login_valid']
            username=login_valid_info['username']

        res = make_response(
            jsonify({'Message': "Transformation has been done successfully",'reg_valid':reg_valid,'user_reg':user_reg,'login_valid':login_valid,"username":username}), 200)
        return res

@app.route('/combine_report_page',methods=['GET','POST'])
def get_pdf_file():
    if request.method=='POST':
        req=request.get_json()

        page_01 = base64.b64decode(req['page_01'].split(',')[1])
        page_02 = base64.b64decode(req['page_02'].split(',')[1])
        
        page_01_path=f'./static/db/imgs/page_01_{randint(0,99999999999999)}.png'
        page_02_path=f'./static/db/imgs/page_02_{randint(0,99999999999999)}.png'

        with open(page_01_path,'wb') as f: f.write(page_01)
        with open(page_02_path,'wb') as f: f.write(page_02)


        res = make_response(
            jsonify({'Message': "PDF have been created successfully",'pdf_report':convert_images_to_pdf([page_02_path,page_01_path])}), 200)
        return res




if (__name__ == '__main__'):
    app.run()