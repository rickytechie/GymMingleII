import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="p-6 flex justify-between items-center bg-white shadow-sm border-b">
        <h1 className="text-2xl font-bold">GymMingle</h1>
        <button className="bg-[#CCFF00] px-6 py-2 rounded-full font-bold">Join Waitlist</button>
      </nav>

      <main className="flex flex-col items-center justify-center py-12 px-4">
        <h2 className="text-5xl font-extrabold text-center mb-6">Find Your Workout Tribe</h2>
        <div className="w-full max-w-sm h-96 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-gray-200">
          <span className="text-gray-400">Profile Swipe Demo</span>
        </div>
      </main>
    </div>
  );
}
