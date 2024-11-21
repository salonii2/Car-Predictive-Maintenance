import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import HealthCheck from './pages/HealthCheck';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
        <Navbar />
        
        <div className="ml-16">
          <Header />
          
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/health" element={<HealthCheck />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
        
        {/* Shimmer Effects */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/5 to-transparent opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;