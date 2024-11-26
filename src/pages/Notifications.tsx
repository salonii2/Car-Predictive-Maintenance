import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Critical: Engine Temperature High',
    message: 'Engine temperature has exceeded normal operating range. Immediate attention required.',
    timestamp: '2 hours ago',
    priority: 'high',
    icon: AlertTriangle
  },
  {
    id: 2,
    title: 'Warning: Oil Level Low',
    message: 'Oil level is below recommended threshold. Schedule service soon.',
    timestamp: '5 hours ago',
    priority: 'medium',
    icon: AlertCircle
  },
  {
    id: 3,
    title: 'Maintenance Due',
    message: 'Regular maintenance service is due in 500km.',
    timestamp: '1 day ago',
    priority: 'low',
    icon: Info
  }
];

export default function Notifications() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {notifications.map((notification) => {
        const Icon = notification.icon;
        return (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border backdrop-blur-sm transition-colors ${
              notification.priority === 'high'
                ? 'bg-red-500/10 border-red-500/50'
                : notification.priority === 'medium'
                ? 'bg-yellow-500/10 border-yellow-500/50'
                : 'bg-blue-500/10 border-blue-500/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${
                notification.priority === 'high'
                  ? 'bg-red-500/20 text-red-500'
                  : notification.priority === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'bg-blue-500/20 text-blue-500'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <span className="text-sm text-gray-400">{notification.timestamp}</span>
                </div>
                <p className="mt-1 text-gray-300">{notification.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}