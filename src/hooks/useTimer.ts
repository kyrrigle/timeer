import { useState, useEffect } from 'react';

interface TimerState {
  startTime: string | null; // ISO string
  isConfigured: boolean;
}

const STORAGE_KEY = 'timeer-state';

export function useTimer() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data: TimerState = JSON.parse(stored);
        if (data.startTime) {
          setStartTime(new Date(data.startTime));
          setIsConfigured(true);
        }
      } catch (e) {
        console.error('Failed to parse stored timer state', e);
      }
    }
  }, []);

  // Save to localStorage whenever startTime changes
  useEffect(() => {
    if (startTime) {
      const data: TimerState = {
        startTime: startTime.toISOString(),
        isConfigured: true,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [startTime]);

  // Update current time every second
  useEffect(() => {
    if (!isConfigured) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isConfigured]);

  const startTimer = (time: Date) => {
    setStartTime(time);
    setIsConfigured(true);
  };

  const resetTimer = () => {
    setStartTime(null);
    setIsConfigured(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getElapsedTime = (): number => {
    if (!startTime) return 0;
    return Math.max(0, currentTime.getTime() - startTime.getTime());
  };

  return {
    startTime,
    isConfigured,
    startTimer,
    resetTimer,
    elapsedMs: getElapsedTime(),
  };
}
