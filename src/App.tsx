import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { StartTimeSelector } from './components/StartTimeSelector';

function App() {
  const { isConfigured, startTimer, resetTimer, elapsedMs } = useTimer();

  if (!isConfigured) {
    return <StartTimeSelector onStart={startTimer} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="pt-8 px-6">
          <button
            onClick={resetTimer}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Reset Timer
          </button>
        </div>

        <TimerDisplay elapsedMs={elapsedMs} />
      </div>
    </div>
  );
}

export default App;
