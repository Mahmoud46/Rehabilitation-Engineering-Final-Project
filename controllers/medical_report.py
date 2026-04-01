import base64
from pathlib import Path
from config.paths import UPLOAD_DIR
from flask import jsonify, request, g
from utils.helpers import images_to_pdf, parse_question_list
from models.File import File
from models.Assessment import Assessment
from datetime import datetime


def medical_assessment():
    user = g.user
    assessment_id = user[8]

    try:
        assessment = Assessment.find_by_id(assessment_id)
        questions_list = parse_question_list(Assessment.find_questions_by_assessment_id(assessment_id))

        return jsonify({ "success": True, 'message': "Report retreived successfully", 
                        "result": { "assessment_date": datetime.strptime(assessment[1], "%Y-%m-%d %H:%M:%S").strftime("%B %d, %Y"), # Convert to Month day, year
                                    "questions": questions_list } }), 200
    except Exception as e:
        print(e)
        return jsonify({ "success": False, "message": "Something went wrong!" }), 500
     

def medical_report_pdf():
    req = request.get_json()
    user = g.user
    assessment_id = user[8]

    try:
        file = File.find_by_assessment_id(assessment_id)
        dist_path = file[6]

        page_01 = base64.b64decode(req['page_01'].split(',')[1])
        page_02 = base64.b64decode(req['page_02'].split(',')[1])
        
        page_01_path=f'{UPLOAD_DIR}/page_01.png'
        page_02_path=f'{UPLOAD_DIR}/page_02.png'

        with open(page_01_path,'wb') as f: f.write(page_01)
        with open(page_02_path,'wb') as f: f.write(page_02)

        # Create report 
        medical_report = images_to_pdf([page_01_path, page_02_path], dist_path)

        # Delete the two images 
        if medical_report:
            Path(page_01_path).unlink(missing_ok=True)
            Path(page_02_path).unlink(missing_ok=True)

        
        return jsonify({ "success": True, 'message': "PDF have been created successfully", "result": medical_report }), 200

    
    except Exception as e:
        print(e)
        return jsonify({ "success": False, "message": "Something went wrong!" }), 500
