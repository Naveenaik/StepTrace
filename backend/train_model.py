import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping
import joblib

def train_model(input_csv, model_path, scaler_path, encoder_path):
    data = pd.read_csv(input_csv)
    X = data[['height', 'width']]  # Add more features as needed
    y = data['person_name']

    # Preprocess data
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_encoded, test_size=0.2, random_state=42)

    # Model definition
    model = Sequential([
        Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
        Dropout(0.3),
        Dense(64, activation='relu'),
        Dropout(0.3),
        Dense(len(label_encoder.classes_), activation='softmax')
    ])
    model.compile(optimizer=Adam(learning_rate=0.0001), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # Train model
    early_stopping = EarlyStopping(patience=5, restore_best_weights=True)
    model.fit(X_train, y_train, validation_split=0.1, epochs=50, batch_size=16, callbacks=[early_stopping])
    
    # Save artifacts
    model.save(model_path)
    joblib.dump(scaler, scaler_path)
    joblib.dump(label_encoder, encoder_path)
    print("Training complete.")
