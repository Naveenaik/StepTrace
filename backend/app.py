from flask import Flask, request, jsonify, Response
# from train import train_model
from test_model import predict_person_from_live_stream
from train_model import train_model
from feature_extraction import extract_features_from_video
from flask_cors import CORS
import os
from excel_operations import get_person_data, delete_rows, maintain_uniform_rows

app = Flask(__name__)
CORS(app)  

@app.route('/extract', methods=['POST'])
def extract():
    data = request.get_json()
    person_name = data.get('person_name')
    video_url = data.get(' video_stream_url')
    if not person_name:
        return jsonify({"error": "Person name is required"}), 400
    try:
        extract_features_from_video(video_url,person_name)
        return jsonify({"message": "Extracted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/train', methods=['POST'])
def train():
    try:
        train_model()
        return jsonify({"message": "Model trained successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['GET'])  # Change to GET for real-time SSE
def predict():
    try:
        video_url = request.args.get('video_stream_url')  # Get video URL from query params
        if not video_url:
            return jsonify({"error": "Video stream URL is required"}), 400

        def stream_predictions():
            try:
                # Call your real-time prediction function
                for prediction in predict_person_from_live_stream(video_url):
                    yield f"data: {prediction}\n\n"  # Send data as SSE stream
            except Exception as e:
                yield f"data: Error: {str(e)}\n\n"

        return Response(stream_predictions(), content_type='text/event-stream')  # Return as SSE

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/restart', methods=['POST'])
def restart_server():
    try:
        os.system("flask run")  
        return jsonify({"message": "Server restarting..."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-person-data', methods=['GET'])
def get_person_data_route():
    person_name = request.args.get('person_name')
    if not person_name:
        return jsonify({"error": "Person name is required"}), 400
    try:
        person_data = get_person_data(person_name)
        return jsonify(person_data.to_dict(orient='records')), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@app.route('/delete-rows', methods=['POST'])
def delete_rows_route():
    data = request.json
    person_name = data.get('person_name')
    rows_to_delete = data.get('rows_to_delete', [])
    if not person_name:
        return jsonify({"error": "Person name is required"}), 400
    try:
        delete_rows(person_name, rows_to_delete)
        return jsonify({"message": "Rows deleted successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/maintain-uniform-rows', methods=['POST'])
def maintain_uniform_rows_route():
    num_rows = request.json.get('num_rows')
    if not num_rows:
        return jsonify({"error": "Number of rows is required"}), 400
    try:
        result = maintain_uniform_rows(num_rows)
        return jsonify({"message": "Uniformity maintained successfully", 
                        "data": result.to_dict(orient='records')}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, threaded=True)  