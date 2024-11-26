import React from 'react';
interface GaugeProps {
  value: number;
  label: string;
  status: 'POOR' | 'AVERAGE' | 'GOOD' | 'EXCELLENT';
}

export default function Gauge({ value, label, status }: GaugeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'POOR': return 'text-red-500';
      case 'AVERAGE': return 'text-yellow-500';
      case 'GOOD': return 'text-green-400';
      case 'EXCELLENT': return 'text-emerald-400';
      default: return 'text-gray-400';
    }
  };

  const rotation = (value / 100) * 180;

  return (
    <div className="relative w-full h-32 bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800">
      <div className="relative h-20 overflow-hidden">
        <div className="absolute w-full h-full">
          <div 
            className="w-1 h-20 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 absolute left-1/2 bottom-0 origin-bottom"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] border-t-[100px] border-t-transparent border-r-[100px] border-r-gray-700/20 border-b-[0px] border-b-transparent" />
      </div>
      <div className="text-center mt-2">
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-lg font-bold">{value}%</span>
          <span className={`text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}