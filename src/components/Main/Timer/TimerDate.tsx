import React, { useState, useEffect } from 'react';

function TimerDate(): React.JSX.Element {
  const [dateObjSt, setDateObjSt] = useState<Date>(new Date());

  const dateFormatOptionsObj = {
    weekday: 'short' as const,
    month: 'short' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const
  };

  const formattedDateStr: string = new Intl.DateTimeFormat('en-US', dateFormatOptionsObj).format(
    dateObjSt
  );

  useEffect(() => {
    const intervalIdNum: ReturnType<typeof setInterval> = setInterval(() => {
      setDateObjSt(new Date());
    }, 60000);

    return () => clearInterval(intervalIdNum);
  }, []);

  return <p className="text-sm text-gray-500">{formattedDateStr}</p>;
}
export default TimerDate;
