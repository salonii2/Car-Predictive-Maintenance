import { ApiResponse, RawApiResponse, SensorData, SensorDataWrapper } from '../types/api';

const API_URL = 'http://127.0.0.1:5000/api/predict';
const MAX_RETRIES = 3;
const RETRY_DELAY = 200;

let brakePadThickness = 12.0; // Starting value for brake pad thickness (mm)
const minBrakePadThickness = 0; // Minimum brake pad thickness (mm)
const decrementRate = 0.05; // Decrement rate per function call (mm)

let tirePressure = 35; // Starting tire pressure (PSI)
const minTirePressure = 20; // Minimum tire pressure (PSI)
const tirePressureDecrementRate = 0.05; // Decrement rate per function call (PSI)

let oilQuality = 100; // Starting value for oil quality (%)
const minOilQuality = 0; // Minimum oil quality (%)
const oilQualityDecrementRate = 0.05; // Decrement rate per function call (%)

let cumulativeMileage = 0; // Starting value for cumulative mileage (km)
const maxCumulativeMileage = 10000; // Maximum cumulative mileage (km)
const mileageIncrementRate = 0.1; // Increment rate per function call (km)

// Function to generate simulated sensor data
const generateSensorData = (): SensorData => {
  const minTemp = 75;  // Minimum temperature (Celsius)
  const maxTemp = 100;  // Maximum temperature (Celsius)
  const period = 600000; // Time period for one full oscillation (milliseconds)
  const time = Date.now() % period; // Loop time within the period (to simulate continuous oscillation)
  const normalizedTime = (time / period) * (2 * Math.PI); // Convert time to radians for sine function
  
  // Oscillating engine temperature based on sine wave
  const engineTemperature = minTemp + (maxTemp - minTemp) * ((Math.sin(normalizedTime) + 1) / 2); // Smooth increase and decrease

  brakePadThickness = Math.max(minBrakePadThickness, brakePadThickness - decrementRate);

  // Gradually decrease tire pressure
  tirePressure = Math.max(minTirePressure, tirePressure - tirePressureDecrementRate);

  // Gradually decrease oil quality
  oilQuality = Math.max(minOilQuality, oilQuality - oilQualityDecrementRate);

  // Gradually increase cumulative mileage
  cumulativeMileage = Math.min(maxCumulativeMileage, cumulativeMileage + mileageIncrementRate);


  return {
    engine_temperature: engineTemperature,
    brake_pad_thickness: brakePadThickness, 
    battery_voltage: Math.random() * (12.65 - 12.55) + 12.55,
    tire_pressure: tirePressure, // Decreasing tire pressure
    oil_quality: oilQuality, // Decreasing oil quality
    cumulative_mileage: cumulativeMileage, // Increasing cumulative mileage
    driving_behavior: Math.floor(Math.random() * 3), // Random choice between 0, 1, 2
    environmental_condition: Math.floor(Math.random() * 2), // Random choice between 0 and 1
  };
};

// Function to call the backend API and fetch predictions
export const fetchVehicleData = async (retryCount = 0): Promise<ApiResponse> => {
  try {
    const sensorData: SensorDataWrapper = { sensor_data: generateSensorData() }; // Wrap the sensor data as per the backend format
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sensorData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData: RawApiResponse = await response.json(); // Expect the raw API response format
    return transformApiResponse(rawData); // Transform the response for frontend usage
  } catch (error) {
    if (retryCount < MAX_RETRIES - 1) {
      console.warn(`API attempt ${retryCount + 1} failed, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return fetchVehicleData(retryCount + 1); // Retry the API call
    }

    console.warn('Using fallback data after all retries failed');
    return getFallbackData(); // Return fallback data if retries fail
  }
};

// Transform the raw API response into the frontend's expected format
const transformApiResponse = (data: RawApiResponse): ApiResponse => ({
  timestamp: data.timestamp,
  input_data: data.input_data,
  predictions: {
    RUL_battery: data.predictions.RUL_battery,
    RUL_brake_pad: data.predictions.RUL_brake_pad,
    RUL_oil: data.predictions.RUL_oil,
    RUL_tire: data.predictions.RUL_tire,
  },

  failure_predictions: {
    brake_pad: data.failure_predictions.Brake_pad === 1 ? 1 : 0,
    battery: data.failure_predictions.Battery === 1 ? 1 : 0,
    oil: data.failure_predictions.Oil === 1 ? 1 : 0,
    tire: data.failure_predictions.Tire === 1 ? 1 : 0,
  },

});

// Fallback data in case the API fails after retries
const getFallbackData = (): ApiResponse => ({
  timestamp: new Date().toISOString(),
  input_data: {
    engine_temperature: 82.45,
    brake_pad_thickness: 10,
    battery_voltage: 8,
    tire_pressure: 31.87,
    oil_quality: 60,
    cumulative_mileage: 200,
    driving_behavior: 1,
    environmental_condition: 1,
  },
  predictions: {
    RUL_battery: '120 days',
    RUL_brake_pad: '200 days',
    RUL_oil: '500 km',
    RUL_tire: '120 days',
  },

  failure_predictions: {
    brake_pad: 0,
    battery: 0,
    oil: 0,
    tire: 0,
  },
});
