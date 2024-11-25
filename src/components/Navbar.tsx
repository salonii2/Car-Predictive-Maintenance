import React from 'react';
import { NavLink } from 'react-router-dom';
import { Car, Bell, Activity, Settings } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { path: '/', icon: Car, label: 'Dashboard' },
    { path: '/notifications', icon: Bell, label: 'Notifications', badge: 3 },
    { path: '/health', icon: Activity, label: 'Health Check' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-8 space-y-8">
      <div className="w-10 h-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/2048px-Volkswagen_logo_2019.svg.png"
          alt="VW Logo"
          className="w-full h-full"
        />
      </div>
      
      <nav className="flex flex-col space-y-6">
        {navItems.map(({ path, icon: Icon, label, badge }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `relative p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-800 text-emerald-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            {badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}