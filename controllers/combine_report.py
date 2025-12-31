import base64
from random import randint
from flask import  Blueprint, make_response, jsonify, request
from services.report_pdf import convert_images_to_pdf

combine_report_bp = Blueprint("combine_report_bp", __name__)


@combine_report_bp.route('/combine_report_page',methods=['GET','POST'])
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