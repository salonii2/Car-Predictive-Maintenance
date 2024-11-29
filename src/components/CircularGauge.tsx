import React from 'react';

interface CircularGaugeProps {
  value: number;
  label: string;
  thresholds: { LOWER_CRITICAL?: number; LOWER_WARNING?: number; UPPER_CRITICAL?: number; UPPER_WARNING?: number }; // Custom thresholds
  icon: React.ReactNode;
}

export default function CircularGauge({ value, label, thresholds, icon }: CircularGaugeProps) {
  // Determine status based on thresholds
  const getStatus = (
    value: number
  ) => {
    if (thresholds.LOWER_CRITICAL !== undefined && value <= thresholds.LOWER_CRITICAL) {
      return 'CRITICAL'; // Too low
    }
    if (thresholds.LOWER_WARNING !== undefined && value <= thresholds.LOWER_WARNING) {
      return 'WARNING'; // Near low critical
    }
    if (thresholds.UPPER_CRITICAL !== undefined && value >= thresholds.UPPER_CRITICAL) {
      return 'CRITICAL'; // Too high
    }
    if (thresholds.UPPER_WARNING !== undefined && value >= thresholds.UPPER_WARNING) {
      return 'WARNING'; // Near high critical
    }
    return 'GOOD'; // Within safe range
  };

  const status = getStatus(value);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CRITICAL': return 'text-red-500';
      case 'WARNING': return 'text-yellow-500';
      case 'GOOD': return 'text-emerald-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'CRITICAL': return 'from-red-500/20 to-transparent';
      case 'WARNING': return 'from-yellow-500/20 to-transparent';
      case 'GOOD': return 'from-emerald-500/20 to-transparent';
      default: return 'from-gray-500/20 to-transparent';
    }
  };

  // Calculate the normalized percentage (0 to 100) based on thresholds
  const normalizeValue = (value: number) => {
    if (label === 'Brake Pad Thickness (MM)') {
      return (value / 12) * 100; // Proportion in the CRITICAL range
    } else if (label === 'TIRE PRESSURE (PSI)') {
      return ((value ) / 35) * 100; // Proportion in the WARNING range
    }else if (label === 'ENGINE TEMPERATURE (C)') {
      return ((value ) / 100) * 100; // Proportion in the WARNING range
    } else {
      return ((value) / 14) * 100; // Proportion in the GOOD range
    }
  };

  const normalizedValue = normalizeValue(value);

  // Calculate offset for the progress circle
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className="relative bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-colors group">
      <div className={`absolute inset-0 bg-gradient-to-b ${getStatusBg(status)} rounded-xl opacity-20`} />
      <div className="relative flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm font-medium ${getStatusColor(status)}`}>{status}</span>
      </div>
      
      <div className="relative w-32 h-32 mx-auto">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90 transform">
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-800"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${getStatusColor(status)} transition-all duration-500`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-gray-400 text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
