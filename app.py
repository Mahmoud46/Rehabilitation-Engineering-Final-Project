from flask import Flask
from controllers.home import home_bp
from controllers.user import user_bp
from controllers.user_data import user_data_bp
from controllers.sign import sign_bp
from controllers.combine_report import combine_report_bp

app = Flask(__name__)

app.register_blueprint(home_bp)
app.register_blueprint(user_bp)
app.register_blueprint(user_data_bp)
app.register_blueprint(sign_bp)
app.register_blueprint(combine_report_bp)




if (__name__ == '__main__'):
    app.run()