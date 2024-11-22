// API Response interfaces
export interface ApiResponse {
  input_data: {
    engine_temperature: number;
    tire_pressure: number;
    battery_voltage: number;
    brake_pad: number;
    oil_quality: number;
  };
  predictions: {
    RUL_battery: string;
    RUL_brake_pad: string;
    RUL_oil: string;
    RUL_tire: string;
  };
}

export interface RawApiResponse {
  sensor_data: {
    engine_temperature: number;
    oil_pressure: number;
    coolant_level: number;
    brake_pad_wear: number;
    tire_pressure: number;
  };
  predictions: {
    battery_health: number;
    battery_rul: string;
    brake_rul: string;
    oil_rul: string;
    tire_rul: string;
  };
}

export interface Metric {
  id: number;
  label: string;
  value: number;
  status: 'CRITICAL' | 'WARNING' | 'GOOD';
  icon: React.ReactNode | string;
  details: string;
}

export interface Alert {
  id: number;
  message: string;
  details: string;
  severity: 'high' | 'medium' | 'low';
}