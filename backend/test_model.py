import cv2
import mediapipe as mp
import numpy as np
from tensorflow.keras.models import load_model
import joblib
import math
from collections import Counter

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, 
                    min_detection_confidence=0.7, 
                    min_tracking_confidence=0.7)
mp_drawing = mp.solutions.drawing_utils

model = load_model('gait_model.h5')
label_encoder = joblib.load('label_encoder.pkl')
scaler = joblib.load('scaler.pkl')

def calculate_angle(a, b, c):
    ab = (b[0] - a[0], b[1] - a[1])
    bc = (c[0] - b[0], c[1] - b[1])
    dot_product = ab[0] * bc[0] + ab[1] * bc[1]
    ab_magnitude = math.sqrt(ab[0] ** 2 + ab[1] ** 2)
    bc_magnitude = math.sqrt(bc[0] ** 2 + bc[1] ** 2)
    if ab_magnitude * bc_magnitude == 0:
        return 0
    angle = math.acos(dot_product / (ab_magnitude * bc_magnitude))
    return math.degrees(angle)

def extract_keypoints(landmarks, image_shape):
    h, w = image_shape[:2]
    keypoints = {
        'left_foot_y': landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y * h,
        'right_foot_y': landmarks[mp_pose.PoseLandmark.RIGHT_FOOT_INDEX.value].y * h,
        'height': abs(landmarks[mp_pose.PoseLandmark.NOSE.value].y * h - max(
            landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y, 
            landmarks[mp_pose.PoseLandmark.RIGHT_FOOT_INDEX.value].y) * h),
        'width': abs(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w -
                     landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w),
    }
    keypoints['height_width_ratio'] = keypoints['height'] / keypoints['width'] if keypoints['width'] > 0 else 0

    left_shoulder = (landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h)
    left_elbow = (landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y * h)
    left_wrist = (landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y * h)
    
    right_shoulder = (landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h)
    right_elbow = (landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y * h)
    right_wrist = (landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y * h)

    left_hip = (landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * h)
    left_knee = (landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h)
    left_ankle = (landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y * h)

    right_hip = (landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y * h)
    right_knee = (landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y * h)
    right_ankle = (landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y * h)

    keypoints['left_elbow_angle'] = calculate_angle(left_shoulder, left_elbow, left_wrist)
    keypoints['right_elbow_angle'] = calculate_angle(right_shoulder, right_elbow, right_wrist)
    keypoints['left_knee_angle'] = calculate_angle(left_hip, left_knee, left_ankle)
    keypoints['right_knee_angle'] = calculate_angle(right_hip, right_knee, right_ankle)

    keypoints['left_foot_speed'] = 0  
    keypoints['right_foot_speed'] = 0  

    return keypoints

def predict_person_from_live_stream(video_url):
    cap = cv2.VideoCapture(video_url)
    if not cap.isOpened():
        yield "Error: Cannot open video stream. Check the video URL or file path."
        return

    predictions = []
    frame_skip = 5
    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_skip == 0:
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(rgb_frame)

            if results.pose_landmarks:
                try:
                    keypoints = extract_keypoints(results.pose_landmarks.landmark, frame.shape)
                    features = np.array([[keypoints['height'], keypoints['width'], keypoints['height_width_ratio'], 
                                          keypoints['left_elbow_angle'], keypoints['right_elbow_angle'], 
                                          keypoints['left_knee_angle'], keypoints['right_knee_angle']]])
                    features_scaled = scaler.transform(features)
                    prediction = model.predict(features_scaled)
                    predicted_class = np.argmax(prediction, axis=1)
                    predicted_name = label_encoder.inverse_transform(predicted_class)
                    predictions.append(predicted_name[0])
                    yield predicted_name[0]
                except Exception as e:
                    yield f"Error during prediction: {e}"

        frame_count += 1

    cap.release()
    most_common_person = Counter(predictions).most_common(1)
    if most_common_person:
        yield f"Final Prediction: {most_common_person[0][0]}"
    else:
        yield "No valid predictions made."
   
