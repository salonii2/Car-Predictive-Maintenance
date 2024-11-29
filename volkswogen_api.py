from flask import Flask, jsonify, request
import pandas as pd
import pickle
from datetime import datetime
from flask_cors import CORS
from pytz import timezone

# Load the trained RUL prediction model
with open("AIML Models/LGBMRegressorForRULPrediction.pkl", "rb") as f:  
    print("Loading RUL model...")
    rul_model = pickle.load(f)

# Load the failure classification model
with open("AIML Models/LGBMClassifierForFailurePrediction.pkl", "rb") as f:
    print("Loading Failure Classification model...")
    failure_model = pickle.load(f)

# Verify model compatibility
if not hasattr(rul_model, "predict"):
    raise ValueError("The RUL model is not properly fitted or does not have a 'predict' method!")
if not hasattr(failure_model, "predict"):
    raise ValueError("The Failure Classification model is not properly fitted or does not have a 'predict' method!")

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Vehicle RUL and Failure Prediction API is live!"

# Preprocess incoming data for the models
def preprocess_data(data):
    # Assuming 'driving_behavior' and 'environmental_condition' are already numeric
    return pd.DataFrame([data])

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Debugging request headers and payload
        print("Request Headers:", request.headers)
        print("Request Body:", request.data)

        # Parse the incoming JSON request
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON format"}), 400
        
        # Extract the sensor data
        sensor_data = data["sensor_data"]
        print("Received sensor data:", sensor_data)
        
        # Preprocess sensor data
        preprocessed_data = preprocess_data(sensor_data)
        print("Preprocessed data for model:", preprocessed_data)
        
        # Make predictions using the RUL model
        rul_predictions = rul_model.predict(preprocessed_data)
        rul_brake, rul_battery, rul_oil, rul_tire = map(float, rul_predictions[0])  # Ensure float format
        
        # Print the RUL predictions for debugging
        print(f"RUL Predictions - Brake: {rul_brake}, Battery: {rul_battery}, Oil: {rul_oil}, Tire: {rul_tire}")


        # Make predictions using the failure classification model
        failure_predictions = failure_model.predict(preprocessed_data)
        Brake_pad_failure, Engine_oil_Failure, Battery_Failure, Tire_Failure = map(float, failure_predictions[0])  # Ensure integer format
        
        # Print the failure classification predictions for debugging
        print(f"Failure Predictions - Brake pad: {Brake_pad_failure}, Engine oil: {Engine_oil_Failure}, "
              f"Battery: {Battery_Failure}, Tire: {Tire_Failure}")
        
        
        # Get the current timestamp in IST
        ist = timezone('Asia/Kolkata')
        current_time = datetime.now(ist).strftime("%Y-%m-%d %H:%M:%S")
        
        # Prepare the response payload
        response = {
            "timestamp": current_time,
            "predictions": {
                "RUL_battery": f"{int(rul_battery)} Days",
                "RUL_brake_pad": f"{int(rul_brake)} Days",
                "RUL_oil": f"{int(rul_oil)} Days",
                "RUL_tire": f"{int(rul_tire)} Days",
            },
            
            "failure_predictions": {
                "Brake_pad_failure": Brake_pad_failure,  # Binary output: 0 or 1
                "Battery_Failure": Battery_Failure,      # Binary output: 0 or 1
                "Engine_oil_Failure": Engine_oil_Failure,       # Binary output: 0 or 1
                "Tire_Failure": Tire_Failure             # Binary output: 0 or 1
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

