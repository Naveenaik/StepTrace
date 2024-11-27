import cv2
import joblib
import numpy as np
from tensorflow.keras.models import load_model
from feature_extraction import extract_features_from_video

def predict(video_url, model_path, scaler_path, encoder_path):
    scaler = joblib.load(scaler_path)
    label_encoder = joblib.load(encoder_path)
    model = load_model(model_path)
    
    # Extract features from video
    features = extract_features_from_video(video_url, None, None)  # Extract without saving CSV
    
    features_scaled = scaler.transform([features])
    prediction = model.predict(features_scaled)
    predicted_person = label_encoder.inverse_transform(np.argmax(prediction, axis=1))
    return predicted_person
