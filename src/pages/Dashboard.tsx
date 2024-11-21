import React, { useState, useEffect } from 'react';
import CircularGauge from '../components/CircularGauge';
import WarningAlert from '../components/WarningAlert';
import { Car, Disc } from 'lucide-react'; // Import Disc icon for Brake Pad

// Mock data for development
const mockData = {
  input_data: {
    engine_temperature: 82.45,
    tire_pressure: 31.87,
    battery_voltage: 88.32,
    brake_pad: 20.23, // Change this to reflect the brake pad status
    oil_quality: 60, // You can also include oil_quality as an example
  },
  predictions: {
    RUL_battery: '8 months',
    RUL_brake_pad: '3 months',
    RUL_oil: '500 km',
    RUL_tire: '12 months',
  },
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeMetrics = () => {
      return [
        {
          id: 1,
          label: 'BRAKEPAD',
          value: mockData.input_data.brake_pad, // Fix: Use the correct value for break_pads
          status:
            mockData.input_data.brake_pad < 30
              ? 'CRITICAL'
              : mockData.input_data.brake_pad < 50
              ? 'WARNING'
              : 'GOOD',
          icon: <Disc className="w-6 h-6 text-red-500" />, // Fix: Add the correct icon for brakes
          details: 'Break pad monitoring',
        },
        {
          id: 2,
          label: 'TIRE PRESSURE',
          value: mockData.input_data.tire_pressure,
          status:
            mockData.input_data.tire_pressure < 28
              ? 'CRITICAL'
              : mockData.input_data.tire_pressure < 32
              ? 'WARNING'
              : 'GOOD',
          icon: '🛞',
          details: 'Tire pressure monitoring',
        },
        {
          id: 3,
          label: 'BATTERY',
          value: mockData.input_data.battery_voltage,
          status:
            mockData.input_data.battery_voltage < 60
              ? 'CRITICAL'
              : mockData.input_data.battery_voltage < 75
              ? 'WARNING'
              : 'GOOD',
          icon: '⚡',
          details: 'Battery health monitoring',
        },
        {
          id: 4,
          label: 'ENGINE OIL',
          value: mockData.input_data.oil_quality,
          status:
            mockData.input_data.oil_quality < 80
              ? 'CRITICAL'
              : mockData.input_data.oil_quality < 60
              ? 'WARNING'
              : 'GOOD',
          icon: '💧',
          details: 'Engine Oil quality monitoring',
        },
      ];
    };

    const initializeAlerts = () => [
      {
        id: 1,
        message: 'Battery Replacement',
        details: `Battery replacement suggested in ${mockData.predictions.RUL_battery}.`,
        severity: 'medium',
      },
      {
        id: 2,
        message: 'Brake Pad Service',
        details: `Brake pads require service in ${mockData.predictions.RUL_brake_pad}.`,
        severity: 'medium',
      },
      {
        id: 3,
        message: 'Oil Change Due',
        details: `Oil change required in ${mockData.predictions.RUL_oil}.`,
        severity: 'high',
      },
      {
        id: 4,
        message: 'Tire Maintenance',
        details: `Tires need maintenance in ${mockData.predictions.RUL_tire}.`,
        severity: 'low',
      },
    ];

    const fluctuateValues = (metrics) =>
      metrics.map((metric) => ({
        ...metric,
        value: Math.max(
          0,
          Math.min(
            100,
            metric.value +
              (Math.random() > 0.5 ? Math.random() * 2 : -Math.random() * 2)
          )
        ), // Add or subtract a random value within range
      }));

    setMetrics(initializeMetrics());
    setAlerts(initializeAlerts());
    setIsLoading(false);

    const interval = setInterval(() => {
      setMetrics((prevMetrics) => fluctuateValues(prevMetrics));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Warning Alerts */}
      <div className="fixed top-20 right-6 w-96 space-y-4 z-50">
        {alerts.map((alert) => (
          <WarningAlert
            key={alert.id}
            message={alert.message}
            details={alert.details}
            severity={alert.severity as 'high' | 'medium' | 'low'}
          />
        ))}
      </div>

      {/* Central Car Display */}
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/5 rounded-xl backdrop-blur-sm border border-emerald-500/20" />
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Car className="w-6 h-6 text-emerald-400" />
              Vehicle Status
            </h2>
            <span className="text-sm text-emerald-400">VW ID.4 GTX</span>
          </div>

          {/* Remaining Useful Life Section */}
          <div className="bg-gray-900 p-4 rounded-lg text-white mb-4">
            <h3 className="text-2xl font-semibold mb-3">
              <span className="text-green-400">🕒</span> Remaining Useful Life
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h4 className="text-xl font-semibold text-blue-500">
                  Brake Pad
                </h4>
                <p className="text-3xl font-bold">
                  {mockData.predictions.RUL_brake_pad}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h4 className="text-xl font-semibold text-blue-500">Battery</h4>
                <p className="text-3xl font-bold">
                  {mockData.predictions.RUL_battery}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h4 className="text-xl font-semibold text-blue-500">
                  Engine Oil
                </h4>
                <p className="text-3xl font-bold">
                  {mockData.predictions.RUL_oil}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h4 className="text-xl font-semibold text-blue-500">
                  Tire Pressure
                </h4>
                <p className="text-3xl font-bold">
                  {mockData.predictions.RUL_tire}
                </p>
              </div>
            </div>
          </div>

          {/* Existing Dashboard Content */}
          <div className="grid grid-cols-2 gap-8">
            <div className="relative aspect-square">
              <img
                src="https://i.ibb.co/brSFwKw/vw-car-puc-transformed-removebg-preview.png"
                alt="Volkswagen 3D Model"
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer" />
              <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-yellow-500 rounded-full animate-pulse cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <CircularGauge
                  key={metric.id}
                  value={parseFloat(metric.value.toFixed(2))}
                  label={metric.label}
                  status={metric.status}
                  icon={metric.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
