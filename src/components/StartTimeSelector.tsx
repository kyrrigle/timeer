import { useState } from 'react';

interface StartTimeSelectorProps {
  onStart: (time: Date) => void;
}

export function StartTimeSelector({ onStart }: StartTimeSelectorProps) {
  const [mode, setMode] = useState<'now' | 'custom'>('now');
  const [customDateTime, setCustomDateTime] = useState('');

  const handleStart = () => {
    if (mode === 'now') {
      onStart(new Date());
    } else {
      if (customDateTime) {
        onStart(new Date(customDateTime));
      }
    }
  };

  const isStartDisabled = mode === 'custom' && !customDateTime;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-light text-gray-800 mb-8 text-center">Timeer</h1>

        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="space-y-3">
            <button
              onClick={() => setMode('now')}
              className={`w-full py-4 px-6 rounded-lg text-lg font-medium transition-all ${
                mode === 'now'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Start from now
            </button>

            <button
              onClick={() => setMode('custom')}
              className={`w-full py-4 px-6 rounded-lg text-lg font-medium transition-all ${
                mode === 'custom'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Start from custom time
            </button>
          </div>

          {/* Custom DateTime Input */}
          {mode === 'custom' && (
            <div className="pt-2">
              <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-2">
                Select date and time
              </label>
              <input
                id="datetime"
                type="datetime-local"
                value={customDateTime}
                onChange={(e) => setCustomDateTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={isStartDisabled}
            className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all ${
              isStartDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
            }`}
          >
            Start Timer
          </button>
        </div>
      </div>
    </div>
  );
}
