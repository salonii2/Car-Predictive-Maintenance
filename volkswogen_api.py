from flask import Flask, jsonify, request
import pandas as pd
import pickle
from datetime import datetime
from flask_cors import CORS
from pytz import timezone

# Load the trained model
with open("trained_model.pkl", "rb") as f:
    print("Loading model...")
    model = pickle.load(f)

# Verify model compatibility
if not hasattr(model, "predict"):
    raise ValueError("The model is not properly fitted or does not have a 'predict' method!")

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Vehicle RUL Prediction API is live!"

# Preprocess incoming data for the model
def preprocess_data(data):
    # Assuming 'driving_behavior' and 'environmental_condition' are already numeric
    return pd.DataFrame([data])

@app.route('/api/predict', methods=['POST'])
def predict_rul():
    try:
        
        # Debugging request headers and payload
        print("Request Headers:", request.headers)
        print("Request Body:", request.data)

        # Parse the incoming JSON request
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON format"}), 40
        
        # Extract the sensor data
        sensor_data = data["sensor_data"]  # Fix: Define 'sensor_data' here
        print("Received sensor data:", sensor_data)
        
        # Extract and preprocess sensor data
        
        print("Received sensor data:", sensor_data)
        preprocessed_data = preprocess_data(sensor_data)
        print("Preprocessed data for model:", preprocessed_data)
        
        # Make predictions using the loaded model
        predictions = model.predict(preprocessed_data)
        rul_brake, rul_battery, rul_oil, rul_tire = map(float, predictions[0])  # Ensure float format
        
        # Get the current timestamp in IST
        ist = timezone('Asia/Kolkata')
        current_time = datetime.now(ist).strftime("%Y-%m-%d %H:%M:%S")
        
        # Prepare the response payload
        response = {
            "timestamp": current_time,
            "predictions": {
                "RUL_battery": f"{rul_battery:.2f} Days",
                "RUL_brake_pad": f"{rul_brake:.2f} Days",
                "RUL_oil": f"{rul_oil:.2f} Days",
                "RUL_tire": f"{rul_tire:.2f} Days"
            },
            "input_data": sensor_data  # Echo back the input data
        }
        
        return jsonify(response), 200

    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
