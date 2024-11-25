import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Clock } from 'lucide-react';

const componentData = [
  { name: 'Engine', health: 85, nextService: '3,000 km', status: 'good' },
  { name: 'Brakes', health: 55, nextService: '5,000 km', status: 'warning' },
  { name: 'Battery', health: 90, nextService: '10,000 km', status: 'good' },
  { name: 'Tires', health: 70, nextService: '8,000 km', status: 'good' },
  { name: 'Oil', health: 45, nextService: '1,000 km', status: 'warning' },
  { name: 'Filters', health: 30, nextService: '500 km', status: 'critical' }
];

const maintenanceSchedule = [
  { id: 1, service: 'Oil Change', date: '3/15/2024', status: 'upcoming' },
  { id: 2, service: 'Brake Inspection', date: '4/1/2024', status: 'scheduled' },
  { id: 3, service: 'Annual Service', date: '5/10/2024', status: 'pending' }
];

export default function HealthCheck() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Component Health Chart */}
      <div className="col-span-8 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800">
        <h2 className="text-xl font-semibold mb-6">Component Health Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={componentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar
                dataKey="health"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Critical Components */}
      <div className="col-span-4 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Critical Components
        </h2>
        <div className="space-y-4">
          {componentData
            .filter(comp => comp.health < 50)
            .map(component => (
              <div
                key={component.name}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-pulse"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-red-400">{component.name}</h3>
                  <span className="text-sm text-red-400">{component.health}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${component.health}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-red-400">
                  Service needed in {component.nextService}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Component Details Grid */}
      <div className="col-span-8 grid grid-cols-3 gap-4">
        {componentData.map((component) => (
          <div
            key={component.name}
            className={`bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm border ${
              component.status === 'critical' 
                ? 'border-red-500/50 animate-pulse' 
                : component.status === 'warning'
                ? 'border-yellow-500/50'
                : 'border-gray-800'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{component.name}</h3>
              <span className={`h-2 w-2 rounded-full ${
                component.status === 'critical' ? 'bg-red-500' :
                component.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
            </div>
            <div className="space-y-2">
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    component.status === 'critical' ? 'bg-red-500' :
                    component.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${component.health}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Health: {component.health}%</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {component.nextService}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Maintenance Schedule */}
      <div className="col-span-4 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Upcoming Maintenance
        </h2>
        <div className="space-y-4">
          {maintenanceSchedule.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{item.service}</h3>
                <p className="text-sm text-gray-400">{item.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-500' :
                item.status === 'scheduled' ? 'bg-blue-500/20 text-blue-500' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}