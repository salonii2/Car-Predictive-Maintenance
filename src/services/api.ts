import { ApiResponse, RawApiResponse, SensorData, SensorDataWrapper } from '../types/api';

const API_URL = 'http://127.0.0.1:5000/api/predict';
const MAX_RETRIES = 3;
const RETRY_DELAY = 20;

let brakePadThickness = 12.0; // Starting value for brake pad thickness (mm)
const minBrakePadThickness = 0; // Minimum brake pad thickness (mm)
const decrementRate = 0.018; // Decrement rate per function call (mm)



let tirePressureFR = 35; // Starting tire pressure (PSI)
const minTirePressureFR = 15; // Minimum tire pressure (PSI)
const tirePressureDecrementRateFR = 0.035; // Decrement rate per function call (PSI)

let tirePressureFL = 35; // Starting tire pressure (PSI)
const minTirePressureFL = 15; // Minimum tire pressure (PSI)
const tirePressureDecrementRateFL = 0.035; // Decrement rate per function call (PSI)

let tirePressureRR = 35; // Starting tire pressure (PSI)
const minTirePressureRR = 15; // Minimum tire pressure (PSI)
const tirePressureDecrementRateRR = 0.035; // Decrement rate per function call (PSI)

let tirePressureRL = 35; // Starting tire pressure (PSI)
const minTirePressureRL = 15; // Minimum tire pressure (PSI)
const tirePressureDecrementRateRL = 0.035; // Decrement rate per function call (PSI)

let EngineOilLevel = 100; // Starting tire pressure (PSI)
const minEngineOilLevel = 50; // Minimum tire pressure (PSI)
const EngineOilLevelDecrementRate = 0.06; // Decrement rate per function call (PSI)

let BrakePressure = 3000; // Starting tire pressure (PSI)
const minBrakePressure = 1500; // Minimum tire pressure (PSI)
const BrakePressureDecrementRate = 9; // Decrement rate per function call (PSI)

let DaysSinceEngineService = 0; 
const maxDaysSinceEngineService = 100; 
const DaysSinceEngineServiceIncrementRate = 0.5; 

let DaysSinceBrakePadService = 70; 
const maxDaysSinceBrakePadService = 200; 
const DaysSinceBrakePadServiceIncrementRate = 0.5; 

let DaysSinceBatteryReplacement = 0; 
const maxDaysSinceBatteryReplacement = 150; 
const DaysSinceBatteryReplacementIncrementRate = 0.5; 

let DaysSinceTireReplacement = 0; 
const maxDaysSinceTireReplacement = 180; 
const DaysSinceTireReplacementIncrementRate = 0.5; 


let KmDrivenAfterLastEngineOilChange = 0; 
const maxKmDrivenAfterLastEngineOilChange = 10000; 
const KmDrivenAfterLastEngineOilChangeIncrementRate = 100; 

let KmDrivenAfterLastBrakePadChange = 0; 
const maxKmDrivenAfterLastBrakePadChange = 10000; 
const KmDrivenAfterLastBrakePadChangeIncrementRate = 100;

let KmDrivenAfterLastTireChange = 0; 
const maxKmDrivenAfterLastTireChange = 10000; 
const KmDrivenAfterLastTireChangeIncrementRate = 100;

let KmDrivenAfterLastBatteryChange = 0; 
const maxKmDrivenAfterLastBatteryChange = 10000; 
const KmDrivenAfterLastBatteryChangeIncrementRate = 100;






let BatteryVoltage = 12.0; // Starting value for brake pad thickness (mm)
const minBatteryVoltage = 10.5; // Minimum brake pad thickness (mm)
const BatteryVoltageDecrementRate = 0.003; // Decrement rate per function call (mm)




let oilQuality = 100; // Starting value for oil quality (%)
const minOilQuality = 0; // Minimum oil quality (%)
const oilQualityDecrementRate = 0.1; // Decrement rate per function call (%)

let cumulativeMileage = 0; // Starting value for cumulative mileage (km)
const maxCumulativeMileage = 10000; // Maximum cumulative mileage (km)
const mileageIncrementRate = 100; // Increment rate per function call (km)

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



  EngineOilLevel = Math.max(minEngineOilLevel, EngineOilLevel - EngineOilLevelDecrementRate);



  // Gradually decrease tire pressure
  tirePressureFR = Math.max(minTirePressureFR, tirePressureFR - tirePressureDecrementRateFR);


  // Gradually decrease tire pressure
  tirePressureFL = Math.max(minTirePressureFL, tirePressureFL - tirePressureDecrementRateFL);

  // Gradually decrease tire pressure
  tirePressureRR = Math.max(minTirePressureRR, tirePressureRR - tirePressureDecrementRateRR);

  // Gradually decrease tire pressure
  tirePressureRL = Math.max(minTirePressureRL, tirePressureRL - tirePressureDecrementRateRL);

  // Gradually decrease tire pressure
  BrakePressure = Math.max(minBrakePressure, BrakePressure - BrakePressureDecrementRate);


  DaysSinceEngineService = Math.min(maxDaysSinceEngineService, DaysSinceEngineService +DaysSinceEngineServiceIncrementRate);

  DaysSinceBrakePadService = Math.min(maxDaysSinceBrakePadService, DaysSinceBrakePadService + DaysSinceBrakePadServiceIncrementRate);
  
  DaysSinceBatteryReplacement = Math.min(maxDaysSinceBatteryReplacement, DaysSinceBatteryReplacement + DaysSinceBatteryReplacementIncrementRate);
  
  DaysSinceTireReplacement = Math.min(maxDaysSinceTireReplacement, DaysSinceTireReplacement + DaysSinceTireReplacementIncrementRate);

  KmDrivenAfterLastEngineOilChange = Math.min(maxKmDrivenAfterLastEngineOilChange, KmDrivenAfterLastEngineOilChange + KmDrivenAfterLastEngineOilChangeIncrementRate);
  
  KmDrivenAfterLastBrakePadChange = Math.min(maxKmDrivenAfterLastBrakePadChange, KmDrivenAfterLastBrakePadChange + KmDrivenAfterLastBrakePadChangeIncrementRate);
  
  KmDrivenAfterLastTireChange = Math.min(maxKmDrivenAfterLastTireChange, KmDrivenAfterLastTireChange + KmDrivenAfterLastTireChangeIncrementRate);
  
  KmDrivenAfterLastBatteryChange = Math.min(maxKmDrivenAfterLastBatteryChange, KmDrivenAfterLastBatteryChange + KmDrivenAfterLastBatteryChangeIncrementRate);









  // Gradually decrease tire pressure
  BatteryVoltage = Math.max(minBatteryVoltage, BatteryVoltage - BatteryVoltageDecrementRate);


  // Gradually decrease oil quality
  oilQuality = Math.max(minOilQuality, oilQuality - oilQualityDecrementRate);

  // Gradually increase cumulative mileage
  cumulativeMileage = Math.min(maxCumulativeMileage, cumulativeMileage + mileageIncrementRate);


  return {
    engine_temperature: engineTemperature,
    brake_pad_thickness: brakePadThickness, 
    battery_voltage: BatteryVoltage,
    tire_pressure_Front_R: tirePressureFR, 
    tire_pressure_Front_L: tirePressureFL,
    tire_pressure_Rear_R: tirePressureRR,
    tire_pressure_Rear_L: tirePressureRL,
    Engine_oil_level: EngineOilLevel,
    Brake_Pressure: BrakePressure,
    oil_quality: oilQuality, // Decreasing oil quality
    Days_Since_Engine_Service: DaysSinceEngineService,
    Days_Since_BrakePad_Service: DaysSinceBrakePadService,
    Days_Since_Battery_Replacement: DaysSinceBatteryReplacement,
    Days_Since_Tire_Replacement: DaysSinceTireReplacement,
    Km_Driven_After_Last_Engine_Oil_Change: KmDrivenAfterLastEngineOilChange,
    Km_Driven_After_Last_BrakePad_Change: KmDrivenAfterLastBrakePadChange,
    Km_Driven_After_Last_Tire_Change: KmDrivenAfterLastTireChange,
    Km_Driven_After_Last_Battery_Change: KmDrivenAfterLastBatteryChange,
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
    Brake_pad_failure: data.failure_predictions.Brake_pad_failure,
    Battery_Failure: data.failure_predictions.Battery_Failure,
    Engine_oil_Failure: data.failure_predictions.Engine_oil_Failure,
    Tire_Failure: data.failure_predictions.Tire_Failure,
  },

});

// Fallback data in case the API fails after retries
const getFallbackData = (): ApiResponse => ({
  timestamp: new Date().toISOString(),
  input_data: {
    engine_temperature: 82.45,
    brake_pad_thickness: 10,
    battery_voltage: 10,
    tire_pressure_Front_R: 30.87,
    tire_pressure_Front_L: 30.87,
    tire_pressure_Rear_R: 30.87,
    tire_pressure_Rear_L: 30.87,
    Engine_oil_level: 80,
    Brake_Pressure: 2500,
    oil_quality: 70,
    Days_Since_Engine_Service: 70,
    Days_Since_BrakePad_Service: 70,
    Days_Since_Battery_Replacement: 70,
    Days_Since_Tire_Replacement: 70,
    Km_Driven_After_Last_Engine_Oil_Change: 5000,
    Km_Driven_After_Last_BrakePad_Change: 5000,
    Km_Driven_After_Last_Tire_Change: 5000,
    Km_Driven_After_Last_Battery_Change: 5000,
    cumulative_mileage: 5000,
    driving_behavior: 1,
    environmental_condition: 1,
  },
  predictions: {
    RUL_battery: '80 Days',
    RUL_brake_pad: '100 Days',
    RUL_oil: '20 Days',
    RUL_tire: '70 Days',
  },

  failure_predictions: {
    Brake_pad_failure: 0,
    Battery_Failure: 0,
    Engine_oil_Failure: 1,
    Tire_Failure: 0,
  },
});
