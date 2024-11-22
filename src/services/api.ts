import { ApiResponse, RawApiResponse, SensorData } from '../types/api';

const API_URL = 'https://car-detect-9.onrender.com/api/predict';
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

const generateSensorData = (): SensorData => ({
  engine_temperature: Math.random() * (95 - 75) + 75,
  oil_pressure: Math.random() * (55 - 35) + 35,
  coolant_level: Math.random() * (90 - 70) + 70,
  brake_pad_wear: Math.random() * (85 - 65) + 65,
  tire_pressure: Math.random() * (35 - 29) + 29
});

export const fetchVehicleData = async (retryCount = 0): Promise<ApiResponse> => {
  try {
    const sensorData = generateSensorData();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sensor_data: sensorData })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RawApiResponse = await response.json();
    return transformApiResponse(data);
  } catch (error) {
    if (retryCount < MAX_RETRIES - 1) {
      console.warn(`API attempt ${retryCount + 1} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchVehicleData(retryCount + 1);
    }
    
    console.warn('Using fallback data after all retries failed');
    return getFallbackData();
  }
};

const transformApiResponse = (data: RawApiResponse): ApiResponse => ({
  input_data: {
    engine_temperature: data.sensor_data.engine_temperature,
    tire_pressure: data.sensor_data.tire_pressure,
    battery_voltage: data.predictions.battery_health,
    brake_pad: data.sensor_data.brake_pad_wear,
    oil_quality: data.sensor_data.oil_pressure,
  },
  predictions: {
    RUL_battery: data.predictions.battery_rul,
    RUL_brake_pad: data.predictions.brake_rul,
    RUL_oil: data.predictions.oil_rul,
    RUL_tire: data.predictions.tire_rul,
  }
});

const getFallbackData = (): ApiResponse => ({
  input_data: {
    engine_temperature: 82.45,
    tire_pressure: 31.87,
    battery_voltage: 88.32,
    brake_pad: 75.23,
    oil_quality: 60,
  },
  predictions: {
    RUL_battery: '8 months',
    RUL_brake_pad: '6 months',
    RUL_oil: '500 km',
    RUL_tire: '12 months',
  }
});