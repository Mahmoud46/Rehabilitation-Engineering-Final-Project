from flask import Blueprint
from middlewares.auth import protected_route
from controllers.medical_report import medical_assessment, medical_report_pdf

# Blueprints
latest_ptsd_assessment_bp = Blueprint("latest_ptsd_assessment_bp", __name__)
latest_ptsd_report_pdf_bp = Blueprint("latest_ptsd_report_pdf_bp", __name__)

# Routes
@latest_ptsd_assessment_bp.route('/api/latest_ptsd_assessment', methods=['GET'])
@protected_route
def get_latest_ptsd_assessment():
    return medical_assessment()

@latest_ptsd_report_pdf_bp.route('/api/latest_ptsd_report_pdf', methods=['POST'])
@protected_route
def get_latest_ptsd_report_pdf():
    return medical_report_pdf()
