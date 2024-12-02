import cv2
import mediapipe as mp
import pandas as pd
import math
import os

output_csv = 'live_output_gait_parameters.csv'
# output_csv = 'new.csv'

def calculate_angle(a, b, c):
    ab = (b[0] - a[0], b[1] - a[1])
    bc = (c[0] - b[0], c[1] - b[1])
    dot_product = ab[0] * bc[0] + ab[1] * bc[1]
    ab_magnitude = math.sqrt(ab[0]**2 + ab[1]**2)
    bc_magnitude = math.sqrt(bc[0]**2 + bc[1]**2)
    return 0 if ab_magnitude * bc_magnitude == 0 else math.degrees(math.acos(dot_product / (ab_magnitude * bc_magnitude)))

def extract_keypoints(landmarks, image_shape):
    h, w = image_shape[:2]
    keypoints = {}

    head_y = landmarks[mp.solutions.pose.PoseLandmark.NOSE.value].y * h
    left_foot_y = landmarks[mp.solutions.pose.PoseLandmark.LEFT_FOOT_INDEX.value].y * h
    right_foot_y = landmarks[mp.solutions.pose.PoseLandmark.RIGHT_FOOT_INDEX.value].y * h
    height = abs(max(left_foot_y, right_foot_y) - head_y)

    left_shoulder_x = landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value].x * w
    right_shoulder_x = landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value].x * w
    width = abs(right_shoulder_x - left_shoulder_x)

    left_knee_y = landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value].y * h
    right_knee_y = landmarks[mp.solutions.pose.PoseLandmark.RIGHT_KNEE.value].y * h
    keypoints['left_knee_angle'] = abs(left_foot_y - left_knee_y)
    keypoints['right_knee_angle'] = abs(right_foot_y - right_knee_y)

    keypoints['left_foot_y'] = left_foot_y
    keypoints['right_foot_y'] = right_foot_y
    keypoints['height'] = height
    keypoints['width'] = width
    keypoints['height_width_ratio'] = height / width if width > 0 else 0

    return keypoints

def extract_features_from_video(video_url, person_name):
    print(person_name)
    frame_rate=30
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7)
    
    cap = cv2.VideoCapture(video_url)
    if not cap.isOpened():
        print(f"Error: Unable to open video file {video_url}")
        return

    keypoints_list = []
    prev_left_foot_y, prev_right_foot_y = None, None
    frame_time = 1 / frame_rate

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)
        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark
            keypoints = extract_keypoints(landmarks, frame.shape)

            if prev_left_foot_y is not None and prev_right_foot_y is not None:
                keypoints['left_foot_speed'] = (keypoints['left_foot_y'] - prev_left_foot_y) / frame_time
                keypoints['right_foot_speed'] = (keypoints['right_foot_y'] - prev_right_foot_y) / frame_time
            else:
                keypoints['left_foot_speed'] = 0
                keypoints['right_foot_speed'] = 0

            prev_left_foot_y = keypoints['left_foot_y']
            prev_right_foot_y = keypoints['right_foot_y']
            
            keypoints['person_name'] = person_name
            keypoints_list.append(keypoints)
            df = pd.DataFrame(keypoints_list)
            if os.path.exists(output_csv):
                df.to_csv(output_csv, mode='a', header=False, index=False)
            else:
                df.to_csv(output_csv, index=False)

    cap.release()

    if not keypoints_list:
        print(f"No landmarks detected in video {video_url}. No data saved.")
        return

    df = pd.DataFrame(keypoints_list)
    if os.path.exists(output_csv):
        df.to_csv(output_csv, mode='a', header=False, index=False)
    else:
        df.to_csv(output_csv, index=False)

    print(f"Features extracted and saved to {output_csv}")

