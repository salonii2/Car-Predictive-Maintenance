import React from 'react';
import { Settings as SettingsIcon, Bell, Volume2, Shield, Monitor, Power } from 'lucide-react';

const settingsCategories = [
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notifications',
    description: 'Configure alert preferences and notification settings',
    settings: [
      { id: 'push', label: 'Push Notifications', type: 'toggle', value: true },
      { id: 'email', label: 'Email Alerts', type: 'toggle', value: false },
      { id: 'critical', label: 'Critical Alerts Only', type: 'toggle', value: false }
    ]
  },
  {
    id: 'sound',
    icon: Volume2,
    title: 'Sound & Alerts',
    description: 'Customize sound settings and alert tones',
    settings: [
      { id: 'warning', label: 'Warning Sound', type: 'toggle', value: true },
      { id: 'startup', label: 'Startup Sound', type: 'toggle', value: false }
    ]
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security',
    description: 'Manage security settings and permissions',
    settings: [
      { id: 'biometric', label: 'Biometric Authentication', type: 'toggle', value: true },
      { id: 'pin', label: 'PIN Lock', type: 'toggle', value: false }
    ]
  },
  {
    id: 'display',
    icon: Monitor,
    title: 'Display',
    description: 'Adjust display preferences and themes',
    settings: [
      { id: 'dark', label: 'Dark Mode', type: 'toggle', value: true },
      { id: 'animations', label: 'Enable Animations', type: 'toggle', value: true }
    ]
  },
  {
    id: 'power',
    icon: Power,
    title: 'Power Management',
    description: 'Configure power-saving settings',
    settings: [
      { id: 'eco', label: 'Eco Mode', type: 'toggle', value: false },
      { id: 'auto', label: 'Auto Sleep', type: 'toggle', value: true }
    ]
  }
];

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-emerald-400" />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      <div className="space-y-6">
        {settingsCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6 text-emerald-400" />
                <div>
                  <h2 className="font-semibold">{category.title}</h2>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {category.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-gray-300">{setting.label}</span>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.value ? 'bg-emerald-500' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}