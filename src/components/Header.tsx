import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">25°C</span>
          <button className="relative p-2 text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}