'use client';
import React, { useEffect, useState } from "react";

const mockStats = {
  speed: 5.2, // km/h
  incline: 6.3, // %
  time: "42:45",
  distance: 3.7, // km
  calories: 235,
};

export default function Home() {
  // Simple animation state for the character's walk
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % 2), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-green-200 overflow-hidden">
      {/* Animated Path & Hills Background */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Sky */}
        <rect x="0" y="0" width="800" height="600" fill="#aee9ff" />
        {/* Distant Hills */}
        <path d="M0 400 Q200 300 400 400 T800 400 V600 H0Z" fill="#7ec850" />
        {/* Closer Hills */}
        <path d="M0 500 Q300 350 600 500 T800 500 V600 H0Z" fill="#4e944f" />
        {/* Path */}
        <path d="M350 600 Q400 400 420 0 Q440 400 450 600Z" fill="#d2a86a" />
      </svg>

      {/* Overlay Stats */}
      <div className="absolute top-8 left-8 flex flex-col gap-4 z-10">
        <div className="bg-blue-700/90 text-white rounded-xl px-6 py-3 text-center shadow-lg">
          <div className="text-4xl font-bold">{mockStats.speed}</div>
          <div className="text-lg">KM/H</div>
        </div>
        <div className="bg-blue-700/80 text-white rounded-xl px-4 py-2 text-center shadow">
          <div className="text-xl font-semibold">+{mockStats.incline}%</div>
        </div>
      </div>
      <div className="absolute top-8 right-8 flex flex-col gap-4 z-10 items-end">
        {/* Elevation Profile */}
        <div className="bg-white/80 rounded-xl p-2 shadow flex items-center">
          <svg width="60" height="40" viewBox="0 0 60 40">
            <polyline
              points="0,35 10,30 20,25 30,20 40,15 50,10 60,5"
              fill="none"
              stroke="#4e944f"
              strokeWidth="3"
            />
            <circle cx="50" cy="10" r="3" fill="#ff7f2a" />
          </svg>
        </div>
        <div className="bg-blue-700/90 text-white rounded-xl px-6 py-3 text-center shadow-lg">
          <div className="text-3xl font-bold">{mockStats.time}</div>
        </div>
        <div className="bg-blue-700/80 text-white rounded-xl px-4 py-2 text-center shadow">
          <div className="text-xl font-semibold">{mockStats.distance} km</div>
          <div className="text-base">{mockStats.calories} Cal</div>
        </div>
      </div>

      {/* Animated Character */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
        <svg width="80" height="180" viewBox="0 0 80 180">
          {/* Body */}
          <rect x="35" y="60" width="10" height="40" rx="5" fill="#ff7f2a" />
          {/* Head */}
          <circle cx="40" cy="45" r="15" fill="#222" />
          {/* Arms */}
          <rect x="20" y="70" width="10" height="40" rx="5" fill="#ff7f2a" transform={step ? "rotate(-20 25 90)" : "rotate(20 25 90)"} />
          <rect x="50" y="70" width="10" height="40" rx="5" fill="#ff7f2a" transform={step ? "rotate(20 55 90)" : "rotate(-20 55 90)"} />
          {/* Legs */}
          <rect x="32" y="100" width="8" height="50" rx="4" fill="#222" transform={step ? "rotate(20 36 125)" : "rotate(-20 36 125)"} />
          <rect x="40" y="100" width="8" height="50" rx="4" fill="#222" transform={step ? "rotate(-20 44 125)" : "rotate(20 44 125)"} />
        </svg>
      </div>

      {/* Foreground Path Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-t from-yellow-900/30 to-transparent rounded-full blur-2xl z-10" />

      {/* Page Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-2xl font-bold text-white drop-shadow-lg tracking-wide">
        Treadmill Path Simulation
      </div>
    </div>
  );
}
