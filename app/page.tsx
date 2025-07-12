"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const initialStats = {
  speed: 5.2, // km/h
  incline: 6.3, // %
  time: "42:45",
  distance: 3.7, // km
  calories: 235,
};

function pad(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

export default function Home() {
  // Remove step state and animation
  const [stats, setStats] = useState(initialStats);
  // For time slider (in seconds)
  const [timeSec, setTimeSec] = useState(42 * 60 + 45);
  // Sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Update time string when timeSec changes
  useEffect(() => {
    const min = Math.floor(timeSec / 60);
    const sec = timeSec % 60;
    setStats((prev) => ({ ...prev, time: `${pad(min)}:${pad(sec)}` }));
  }, [timeSec]);

  // Calculate horizontal position based on speed (e.g., 0-20 km/h maps to 0-80% of track)
  const minSpeed = 0;
  const maxSpeed = 20;
  const percent = ((stats.speed - minSpeed) / (maxSpeed - minSpeed)) * 80; // 0% to 80%

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
      </svg>

      {/* Modern Stat Card on Left Side */}
      <div className="absolute top-16 left-8 z-20">
        <div className="bg-white/90 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 w-64 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 text-white rounded-xl px-4 py-2 text-center shadow font-bold text-3xl w-20">{stats.speed}</div>
            <div className="flex flex-col">
              <span className="text-blue-700 font-semibold text-lg">KM/H</span>
              <span className="text-blue-500 font-medium text-base">+{stats.incline}%</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <svg width="60" height="40" viewBox="0 0 60 40">
              <polyline
                points="0,35 10,30 20,25 30,20 40,15 50,10 60,5"
                fill="none"
                stroke="#4e944f"
                strokeWidth="3"
              />
              <circle cx="50" cy="10" r="3" fill="#ff7f2a" />
            </svg>
            <div className="flex flex-col gap-1">
              <span className="text-blue-700 font-semibold text-lg">{stats.time}</span>
              <span className="text-blue-500 font-medium text-base">{stats.distance} km</span>
              <span className="text-blue-500 font-medium text-base">{stats.calories} Cal</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2D Track (Horizontal) */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[60vw] max-w-3xl h-8 bg-gradient-to-b from-orange-300 to-orange-600 rounded-full border-4 border-orange-800 shadow-lg z-10 flex items-center justify-center">
        {/* Optional: Track lines */}
        <div className="w-full h-1 bg-white/60 rounded-full mx-4" />
      </div>

      {/* Animated Character (GIF) on 2D Track */}
      <div
        className="absolute bottom-40 z-20 flex items-end justify-center transition-all duration-300"
        style={{
          left: `calc(${percent}% + 10%)`, // 10% offset to keep runner on track
          transform: "translateX(-50%)",
        }}
      >
        <Image
          src="/runner.gif"
          alt="Running character"
          width={100}
          height={100}
          className="object-contain bg-transparent size-96 drop-shadow-lg"
          priority
        />
      </div>

      {/* Foreground Path Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-t from-yellow-900/30 to-transparent rounded-full blur-2xl z-10" />

      {/* Page Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-3xl uppercase font-bold text-blue-500 drop-shadow-lg tracking-wide">
        Treadmill Path Simulation
      </div>

      {/* Sidebar Controls with open/close */}
      <aside
        className={`fixed right-0 top-0 h-full w-72 bg-white/90 shadow-lg z-20 flex flex-col p-6 gap-6 border-l border-gray-200 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: sidebarOpen ? undefined : "none" }}
      >
        <button
          className="absolute -left-10 top-6 bg-blue-700 text-white rounded-full p-2 shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          {/* Close (chevron) icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-xl font-bold mb-2 text-blue-800">Simulate Values</h2>
        {/* Speed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Speed (km/h)</label>
          <input
            type="range"
            min={0}
            max={20}
            step={0.1}
            value={stats.speed}
            onChange={e => setStats(s => ({ ...s, speed: parseFloat(e.target.value) }))}
            className="w-full accent-blue-700"
          />
          <div className="text-right text-blue-700 font-semibold">{stats.speed.toFixed(1)}</div>
        </div>
        {/* Incline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Incline (%)</label>
          <input
            type="range"
            min={0}
            max={15}
            step={0.1}
            value={stats.incline}
            onChange={e => setStats(s => ({ ...s, incline: parseFloat(e.target.value) }))}
            className="w-full accent-blue-700"
          />
          <div className="text-right text-blue-700 font-semibold">{stats.incline.toFixed(1)}</div>
        </div>
        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
          <input
            type="range"
            min={0}
            max={42}
            step={0.1}
            value={stats.distance}
            onChange={e => setStats(s => ({ ...s, distance: parseFloat(e.target.value) }))}
            className="w-full accent-blue-700"
          />
          <div className="text-right text-blue-700 font-semibold">{stats.distance.toFixed(1)}</div>
        </div>
        {/* Calories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
          <input
            type="number"
            min={0}
            max={2000}
            value={stats.calories}
            onChange={e => setStats(s => ({ ...s, calories: parseInt(e.target.value) || 0 }))}
            className="w-full border rounded px-2 py-1 text-blue-700 font-semibold"
          />
        </div>
        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time (min:sec)</label>
          <input
            type="range"
            min={0}
            max={3600}
            step={5}
            value={timeSec}
            onChange={e => setTimeSec(parseInt(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="text-right text-blue-700 font-semibold">{stats.time}</div>
        </div>
      </aside>
      {/* Sidebar open button (when closed) */}
      {!sidebarOpen && (
        <button
          className="fixed right-4 top-56 z-30 bg-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          {/* Sliders icon */}
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="24" y2="21" /><line x1="4" y1="14" x2="24" y2="14" /><line x1="4" y1="7" x2="24" y2="7" /><circle cx="14" cy="21" r="2" /><circle cx="8" cy="14" r="2" /><circle cx="20" cy="7" r="2" /></svg>
        </button>
      )}
    </div>
  );
}
