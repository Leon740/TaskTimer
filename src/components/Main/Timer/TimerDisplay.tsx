import React, { useState } from 'react';
import TimerDate from './TimerDate';
import TimerSelect from './TimerSelect';
import TimerBorder from './TimerBorder';

interface TimerDisplayPropsI {
  hours: number;
  minutes: number;
  seconds: number;
}

function TimerDisplay({ hours, minutes, seconds }: TimerDisplayPropsI): React.JSX.Element {
  const [splitTimeSt, setSplitTimeSt] = useState<number>(45);
  const splitCompletedPercentage: number = ((minutes / splitTimeSt) * 100) % 100;

  return (
    <div className="w-256 h-256 flex flex-col justify-center items-center text-center overflow-hidden relative">
      <div className="relative z-40 flex flex-col items-center">
        <TimerDate />
        <h1 className="text-xl text-white">
          {hours > 0 && `${hours}:`}
          {minutes}:{seconds}
        </h1>
        <TimerSelect value={splitTimeSt} onChangeFn={setSplitTimeSt} />
      </div>

      <TimerBorder percentage={splitCompletedPercentage} />
    </div>
  );
}
export default TimerDisplay;
