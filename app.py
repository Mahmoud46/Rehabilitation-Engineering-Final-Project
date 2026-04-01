from flask import Flask
from config.env import ENV
from routes.home import home_bp
from routes.auth import signup_bp, login_bp, logout_bp
from routes.services import latest_ptsd_assessment_bp, latest_ptsd_report_pdf_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = ENV["JWT_SECRET"]

app.register_blueprint(home_bp)

app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)

app.register_blueprint(latest_ptsd_assessment_bp)
app.register_blueprint(latest_ptsd_report_pdf_bp)

if __name__ == "__main__":
    app.run(port=ENV["PORT"])