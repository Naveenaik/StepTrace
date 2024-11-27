from flask import Flask, request, jsonify
from train import train_model
from test import test_model
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React Frontend

@app.route('/train', methods=['POST'])
def train():
    data = request.get_json()
    person_name = data.get('person_name')
    if not person_name:
        return jsonify({"error": "Person name is required"}), 400

    try:
        train_model(person_name)
        return jsonify({"message": "Model trained successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        video_url = request.json.get('video_stream_url')
        prediction = test_model(video_url)
        return jsonify({"predicted_person": prediction}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
