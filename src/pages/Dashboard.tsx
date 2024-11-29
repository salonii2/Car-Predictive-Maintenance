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
          thresholds: {  LOWER_CRITICAL: 3, LOWER_WARNING: 7 }, // Thresholds for brake pad thickness
          icon: <Disc className="w-6 h-6 text-red-500" />,
          details: 'MM',
        },
        {
          id: 2,
          label: 'TIRE PRESSURE (PSI)',
          value: Math.round(data.input_data.tire_pressure_Front_R * 100) / 100,
          thresholds: { LOWER_CRITICAL: 20, LOWER_WARNING: 30 }, // Thresholds for tire pressure
          icon: '🛞',
          details: 'PSI',
        },
        {
          id: 3,
          label: 'BATTERY VOLTAGE (VOLT)',
          value: Math.round(data.input_data.battery_voltage * 100) / 100,
          thresholds: { LOWER_CRITICAL: 10.5,LOWER_WARNING: 11.5 }, // Thresholds for battery voltage
          icon: '⚡',
          details: 'Volt',
        },
        {
          id: 4,
          label: 'ENGINE TEMPERATURE (C)',
          value: Math.round(data.input_data.engine_temperature * 100) / 100,
          thresholds: { LOWER_CRITICAL: 5,LOWER_WARNING: 10,UPPER_WARNING: 80,UPPER_CRITICAL:90 }, // Thresholds for engine temperature
          icon: '🔥',
          details: 'C',
        },
      ];

      setMetrics(newMetrics);
      updateAlerts(data);
    };

    const updateAlerts = (data: ApiResponse) => {
      const failurePredictions = data.failure_predictions;
      const newAlerts: Alert[] = [];
        // Check failure predictions and create alerts accordingly
      if (failurePredictions.Brake_pad_failure === 1) {
        newAlerts.push({
          id: 1,
          message: 'Brake Pad Will Fail Soon',
          details: 'Brake pad will need replacement soon.',
          severity: 'high',
        });
      }
      if (failurePredictions.Battery_Failure === 1) {
        newAlerts.push({
          id: 2,
          message: 'Battery Will Fail Soon',
          details: 'Battery needs replacement soon.',
          severity: 'medium',
        });
      }
      if (failurePredictions.Engine_oil_Failure === 1) {
        newAlerts.push({
          id: 3,
          message: 'Oil Will Fail Soon',
          details: 'Oil quality is degrading and needs to be changed.',
          severity: 'high',
        });
      }
      if (failurePredictions.Tire_Failure === 1) {
        newAlerts.push({
          id: 4,
          message: 'Tire Will Fail Soon',
          details: 'Tires need maintenance soon.',
          severity: 'medium',
        });
      }

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

    // Poll every 10 seconds
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