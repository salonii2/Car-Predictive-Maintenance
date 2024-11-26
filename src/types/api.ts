// Represents the structure of individual sensor readings
export type SensorData = {
  engine_temperature: number;
  brake_pad_thickness: number;
  battery_voltage: number;
  tire_pressure: number;
  oil_quality: number;
  cumulative_mileage: number;
  driving_behavior: number;
  environmental_condition: number;
};

// Wrapper type to match the expected backend payload structure
export type SensorDataWrapper = {
  sensor_data: SensorData;
};

// Represents the raw API response format from the backend
export type RawApiResponse = {
  timestamp: string;
  predictions: {
    RUL_battery: string;
    RUL_brake_pad: string;
    RUL_oil: string;
    RUL_tire: string;
  };
  input_data: SensorData;
};

// Processed API response structure used in the frontend
export type ApiResponse = {
  timestamp: string;
  predictions: {
    RUL_battery: string;
    RUL_brake_pad: string;
    RUL_oil: string;
    RUL_tire: string;
  };
  input_data: SensorData;
};


export interface Metric {
  id: number; // Unique identifier for the metric
  label: string; // Display name of the metric
  value: number; // Current value of the metric
  thresholds: { // Thresholds for determining status
    LOWER_CRITICAL: number; // Lower Critical limit for CRITICAL status
    LOWER_WARNING: number; // LOwer Warning limit for WARNING status
    UPPER_WARNING: number; // Upper Critical limit for CRITICAL status
    UPPER_CRITICAL: number; // Upper Warning limit for WARNING status
  };
  icon: React.ReactNode | string; // Icon representing the metric
  details: string; // Description or additional information about the metric
}


export interface Alert {
  id: number;
  message: string;
  details: string;
  severity: 'high' | 'medium' | 'low';
}