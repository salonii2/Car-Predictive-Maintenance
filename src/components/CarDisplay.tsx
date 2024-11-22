import React from 'react';

export default function CarDisplay() {
  return (
    <div className="relative aspect-square">
      <img
        src="https://i.ibb.co/brSFwKw/vw-car-puc-transformed-removebg-preview.png"
        alt="Volkswagen 3D Model"
        className="w-full h-full object-contain rounded-lg"
      />
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer" />
      <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-yellow-500 rounded-full animate-pulse cursor-pointer" />
    </div>
  );
}