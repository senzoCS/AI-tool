import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Animated Background Placeholder */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
        {/* You can later use <canvas> or animated logos here */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
          alt="YouTube Logo" 
          className="absolute top-10 left-10 w-20 animate-pulse"
        />
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/6/69/TikTok_logo.svg" 
          alt="TikTok Logo" 
          className="absolute bottom-10 right-10 w-20 animate-bounce"
        />
      </div>

      {/* Foreground Content */}
      <main className="relative z-10 p-8">
        <h1 className="text-5xl font-bold mb-6 text-center">
          Bringing <span className="text-blue-500">AI</span> to Content Creation
        </h1>
        <p className="text-center text-lg text-gray-300 mb-10">
          With just one click.
        </p>

        <Dashboard userName="Creator" />
      </main>
    </div>
  );
}

export default App;