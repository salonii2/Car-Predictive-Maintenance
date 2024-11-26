import React from 'react';
import { ApiResponse } from '../types/api';

interface RULSectionProps {
  predictions: ApiResponse['predictions'];
}

export default function RULSection({ predictions }: RULSectionProps) {
  const items = [
    { label: 'Brake Pad', value: predictions.RUL_brake_pad },
    { label: 'Battery', value: predictions.RUL_battery },
    { label: 'Engine Oil', value: predictions.RUL_oil },
    { label: 'Tire', value: predictions.RUL_tire },
  ];

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white mb-4">
      <h3 className="text-2xl font-semibold mb-3">
        <span className="text-green-400">🕒</span> Remaining Useful Life
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {items.map(({ label, value }) => (
          <div key={label} className="bg-gray-800 p-4 rounded-lg text-center">
            <h4 className="text-xl font-semibold text-blue-500">{label}</h4>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}