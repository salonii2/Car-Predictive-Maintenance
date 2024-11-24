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
          label: 'Brake Pad Thickness',
          value: data.input_data.brake_pad_thickness,
          status: getStatus(data.input_data.brake_pad_thickness),
          icon: <Disc className="w-6 h-6 text-red-500" />,
          details: 'Break pad monitoring',
        },
        {
          id: 2,
          label: 'TIRE PRESSURE',
          value: data.input_data.tire_pressure,
          status: getStatus(data.input_data.tire_pressure),
          icon: '🛞',
          details: 'Tire pressure monitoring',
        },
        {
          id: 3,
          label: 'BATTERY VOLTAGE',
          value: data.input_data.battery_voltage,
          status: getStatus(data.input_data.battery_voltage),
          icon: '⚡',
          details: 'Battery health monitoring',
        },
        
        {
          id: 4,
          label: 'Engine Temperature',
          value: data.input_data.engine_temperature,
          status: getStatus(data.input_data.engine_temperature),
          icon: '🔥',
          details: 'Engine temperature monitoring',
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
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (value: number): 'CRITICAL' | 'WARNING' | 'GOOD' => {
    if (value < 30) return 'CRITICAL';
    if (value < 60) return 'WARNING';
    return 'GOOD';
  };

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
                  value={parseFloat(metric.value.toFixed(2))}
                  label={metric.label}
                  status={metric.status}
                  icon={metric.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
