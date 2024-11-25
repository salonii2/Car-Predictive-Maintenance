import React, { useState, useEffect } from 'react';
import CircularGauge from '../components/CircularGauge';
import WarningAlert from '../components/WarningAlert';
import RULSection from '../components/RULSection';
import CarDisplay from '../components/CarDisplay';
import { Car, Disc } from 'lucide-react';
import { fetchVehicleData } from '../services/api';
import { ApiResponse, Metric, Alert } from '../types/api';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateMetricsFromApi = (data: ApiResponse) => {
      const newMetrics: Metric[] = [
        {
          id: 1,
          label: 'Brake Pad Thickness (MM)',
          value: Math.round(data.input_data.brake_pad_thickness * 100) / 100,
          thresholds: { CRITICAL: 3, WARNING: 7, GOOD: 12 }, // Thresholds for brake pad thickness
          icon: <Disc className="w-6 h-6 text-red-500" />,
          details: 'MM',
        },
        {
          id: 2,
          label: 'TIRE PRESSURE (PSI)',
          value: Math.round(data.input_data.tire_pressure * 100) / 100,
          thresholds: { CRITICAL: 20, WARNING: 30, GOOD: 35 }, // Thresholds for tire pressure
          icon: '🛞',
          details: 'PSI',
        },
        {
          id: 3,
          label: 'BATTERY VOLTAGE (VOLT)',
          value: Math.round(data.input_data.battery_voltage * 100) / 100,
          thresholds: { CRITICAL: 10.5, WARNING: 11.5, GOOD: 12.6 }, // Thresholds for battery voltage
          icon: '⚡',
          details: 'Volt',
        },
        {
          id: 4,
          label: 'ENGINE TEMPERATURE (C)',
          value: Math.round(data.input_data.engine_temperature * 100) / 100,
          thresholds: { CRITICAL: 100, WARNING: 85, GOOD: 70 }, // Thresholds for engine temperature
          icon: '🔥',
          details: 'C',
        },
      ];

      setMetrics(newMetrics);
      updateAlerts(data);
    };

    const updateAlerts = (data: ApiResponse) => {
      const newAlerts: Alert[] = [
        {
          id: 1,
          message: 'Battery Replacement Needed Soon',
          details: `Estimated Remaining Useful Life: ${data.predictions.RUL_battery}`,
          severity: 'medium',
        },
        {
          id: 2,
          message: 'Brake Pad Service Required',
          details: `Estimated Remaining Useful Life: ${data.predictions.RUL_brake_pad}`,
          severity: 'medium',
        },
        {
          id: 3,
          message: 'Oil Change Due',
          details: `Oil change required in ${data.predictions.RUL_oil}`,
          severity: 'high',
        },
        {
          id: 4,
          message: 'Tire Maintenance Required',
          details: `Tires need maintenance in ${data.predictions.RUL_tire}`,
          severity: 'low',
        },
      ];

      setAlerts(newAlerts);
    };

    const fetchData = async () => {
      try {
        setError(null);
        const data = await fetchVehicleData();
        setApiData(data);
        updateMetricsFromApi(data);
      } catch (err) {
        setError('Failed to fetch vehicle data. Using fallback data.');
        console.error('Dashboard Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 30 seconds
    const interval = setInterval(fetchData, 5000);

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
      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Warning Alerts */}
      <div className="fixed top-20 right-6 w-96 space-y-4 z-50">
        {alerts.map((alert) => (
          <WarningAlert
            key={alert.id}
            message={alert.message}
            details={alert.details}
            severity={alert.severity}
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

          {apiData && <RULSection predictions={apiData.predictions} />}

          {/* Car Display and Gauges */}
          <div className="grid grid-cols-2 gap-8">
            <CarDisplay />

            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <CircularGauge
                  key={metric.id}
                  value={metric.value}
                  label={metric.label}
                  thresholds={metric.thresholds} // Pass thresholds
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