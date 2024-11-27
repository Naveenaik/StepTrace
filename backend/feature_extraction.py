import cv2
import mediapipe as mp
import pandas as pd
import math
import os
output_csv = 'live_output_gait_parameters.csv'
def calculate_angle(a, b, c):
    ab = (b[0] - a[0], b[1] - a[1])
    bc = (c[0] - b[0], c[1] - b[1])
    dot_product = ab[0] * bc[0] + ab[1] * bc[1]
    ab_magnitude = math.sqrt(ab[0]**2 + ab[1]**2)
    bc_magnitude = math.sqrt(bc[0]**2 + bc[1]**2)
    return 0 if ab_magnitude * bc_magnitude == 0 else math.degrees(math.acos(dot_product / (ab_magnitude * bc_magnitude)))

def extract_features_from_video(video_url, person_name):
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7)
    
    cap = cv2.VideoCapture(video_url)
    keypoints_list = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)
        if results.pose_landmarks:
            # Extract landmarks and calculate key metrics
            landmarks = results.pose_landmarks.landmark
            frame_h, frame_w = frame.shape[:2]
            keypoints = {
                'person_name': person_name,
                'height': abs(landmarks[mp_pose.PoseLandmark.NOSE.value].y - max(
                    landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y, 
                    landmarks[mp_pose.PoseLandmark.RIGHT_FOOT_INDEX.value].y)) * frame_h,
                'width': abs(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x -
                             landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x) * frame_w,
            }
            keypoints_list.append(keypoints)
    
    cap.release()
    df = pd.DataFrame(keypoints_list)
    if os.path.exists(output_csv):
        df.to_csv(output_csv, mode='a', header=False, index=False)
    else:
        df.to_csv(output_csv, index=False)

    print(f"Features extracted and saved to {output_csv}")
