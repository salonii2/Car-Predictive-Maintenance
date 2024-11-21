import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface WarningAlertProps {
  message: string;
  severity: 'high' | 'medium' | 'low';
  details?: string;
}

export default function WarningAlert({ message, severity, details }: WarningAlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const severityStyles = {
    high: 'bg-red-500/10 border-red-500/50 text-red-500 animate-pulse',
    medium: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500',
    low: 'bg-blue-500/10 border-blue-500/50 text-blue-500'
  };

  return (
    <div className={`relative flex items-start p-4 rounded-lg border backdrop-blur-lg ${severityStyles[severity]}`}>
      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="ml-3 flex-1">
        <h3 className="font-semibold">{message}</h3>
        {details && <p className="mt-1 text-sm opacity-80">{details}</p>}
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}