interface TimerDisplayProps {
  elapsedMs: number;
}

interface FormattedTime {
  primary: string;
  secondary: string;
}

function formatElapsedTime(ms: number): FormattedTime {
  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  // Less than 1 minute - show seconds only
  if (totalSeconds < 60) {
    return {
      primary: `${totalSeconds} ${totalSeconds === 1 ? 'second' : 'seconds'}`,
      secondary: ''
    };
  }

  // Less than 1 hour - show minutes and seconds
  if (totalMinutes < 60) {
    const seconds = totalSeconds % 60;
    return {
      primary: `${totalMinutes} ${totalMinutes === 1 ? 'minute' : 'minutes'}`,
      secondary: `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
    };
  }

  // Less than 24 hours - show hours and minutes
  if (totalHours < 24) {
    const minutes = totalMinutes % 60;
    return {
      primary: `${totalHours} ${totalHours === 1 ? 'hour' : 'hours'}`,
      secondary: `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
    };
  }

  // Less than 7 days - show days and hours
  if (totalDays < 7) {
    const hours = totalHours % 24;
    return {
      primary: `${totalDays} ${totalDays === 1 ? 'day' : 'days'}`,
      secondary: `${hours} ${hours === 1 ? 'hour' : 'hours'}`
    };
  }

  // 7 days or more - show weeks and days
  const days = totalDays % 7;
  return {
    primary: `${totalWeeks} ${totalWeeks === 1 ? 'week' : 'weeks'}`,
    secondary: `${days} ${days === 1 ? 'day' : 'days'}`
  };
}

export function TimerDisplay({ elapsedMs }: TimerDisplayProps) {
  const time = formatElapsedTime(elapsedMs);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="text-6xl md:text-8xl font-light text-gray-800 text-center leading-tight">
        {time.primary}
        {time.secondary && (
          <>
            <br />
            {time.secondary}
          </>
        )}
      </div>
    </div>
  );
}
