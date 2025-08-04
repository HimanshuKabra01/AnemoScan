from flask import Flask
from flask_cors import CORS
from routes.symptom_routes import symptom_bp
from routes.blood_routes import blood_bp

app = Flask(__name__)
CORS(app)  # Allow frontend to call backend

# Register blueprints
app.register_blueprint(symptom_bp, url_prefix="/symptom-checker")
app.register_blueprint(blood_bp, url_prefix="/blood-prediction")

if __name__ == "__main__":
    app.run(debug=True)