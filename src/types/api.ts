// Represents the structure of individual sensor readings
export type SensorData = {
  engine_temperature: number;
  brake_pad_thickness: number;
  battery_voltage: number;
  tire_pressure_Front_R: number;
  tire_pressure_Front_L: number;
  tire_pressure_Rear_R: number;
  tire_pressure_Rear_L: number;
  Engine_oil_level: number;
  Brake_Pressure: number;
  oil_quality: number;
  Days_Since_Engine_Service: number;
  Days_Since_BrakePad_Service: number;
  Days_Since_Battery_Replacement: number;
  Days_Since_Tire_Replacement: number;
  Km_Driven_After_Last_Engine_Oil_Change: number;
  Km_Driven_After_Last_BrakePad_Change: number;
  Km_Driven_After_Last_Tire_Change: number;
  Km_Driven_After_Last_Battery_Change: number;
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
  failure_predictions: {
    Brake_pad_failure: number;  // 0 or 1 for failure prediction
    Battery_Failure: number;    // 0 or 1 for failure prediction
    Engine_oil_Failure: number;        // 0 or 1 for failure prediction
    Tire_Failure: number;       // 0 or 1 for failure prediction
  };
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

  failure_predictions: {
    Brake_pad_failure: number;  // 0 or 1 for failure prediction
    Battery_Failure: number;    // 0 or 1 for failure prediction
    Engine_oil_Failure: number;        // 0 or 1 for failure prediction
    Tire_Failure: number;       // 0 or 1 for failure prediction
  };
  
};


export interface Metric {
  id: number; // Unique identifier for the metric
  label: string; // Display name of the metric
  value: number; // Current value of the metric
  thresholds: { // Thresholds for determining status
    LOWER_CRITICAL?: number; // Lower Critical limit for CRITICAL status
    LOWER_WARNING?: number; // Lower Warning limit for WARNING status
    UPPER_WARNING?: number; // Upper Warning limit for CRITICAL status
    UPPER_CRITICAL?: number; // Upper Critical limit for WARNING status
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