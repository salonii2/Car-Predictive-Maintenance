import React from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Car,
  User,
  Moon,
  Sun,
  Wrench,
  Clock,
  Shield,
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gray-900/80 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-[#4ade80]" />
          User Profile
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-6 p-4 bg-gray-800 rounded-lg">
            <div className="relative group">
              <img
                src="https://i.pinimg.com/236x/c1/52/14/c152143398567a95925a0d60e57dfc41.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#4ade80]"
              />
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <span className="text-sm text-white">Change</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg">John Doe</h3>
              <p className="text-gray-400">john.doe@example.com</p>
              <button className="mt-2 px-4 py-1 bg-[#4ade80] rounded text-sm font-medium hover:bg-[#4ade80]/90 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/80 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-[#4ade80]" />
          Display Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-gray-400" />
              <span>Dark Mode</span>
            </div>
            <button className="w-12 h-6 bg-[#4ade80] rounded-full relative">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-gray-400" />
              <span>High Contrast</span>
            </div>
            <button className="w-12 h-6 bg-gray-700 rounded-full relative">
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/80 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#4ade80]" />
          Notification Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-gray-400" />
              <span>Maintenance Alerts</span>
            </div>
            <button className="w-12 h-6 bg-[#4ade80] rounded-full relative">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span>Security Alerts</span>
            </div>
            <button className="w-12 h-6 bg-[#4ade80] rounded-full relative">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>Service Reminders</span>
            </div>
            <button className="w-12 h-6 bg-[#4ade80] rounded-full relative">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/80 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Car className="w-5 h-5 text-[#4ade80]" />
          Vehicle Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-400">Model</span>
            <p className="font-medium">Volkswagen Golf R</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-400">Year</span>
            <p className="font-medium">2024</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-400">VIN</span>
            <p className="font-medium">WVWLF7AU2FW135411</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-400">Last Service</span>
            <p className="font-medium">2024-02-15</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
