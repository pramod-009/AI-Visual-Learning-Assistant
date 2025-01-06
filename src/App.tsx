import React from 'react';
import { Camera } from './components/Camera';
import { BookOpen } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Learning Assistant</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Get Instant Help with Your Problems</h2>
          <p className="mt-2 text-lg text-gray-600">
            Point your camera at any problem, and I'll help you solve it step by step
          </p>
        </div>

        <Camera />
      </main>
    </div>
  );
}

export default App;