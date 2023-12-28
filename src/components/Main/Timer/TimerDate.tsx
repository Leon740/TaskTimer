import React, { useState, useEffect } from 'react';

function TimerDate(): React.JSX.Element {
  const [dateSt, setDateSt] = useState<Date>(new Date());

  const dateFormatOptions = {
    weekday: 'short' as const,
    month: 'short' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const
  };

  const formattedDate: string = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(dateSt);

  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setDateSt(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return <p className="text-sm text-gray-500">{formattedDate}</p>;
}
export default TimerDate;
