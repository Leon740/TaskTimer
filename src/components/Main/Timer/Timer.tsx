import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

interface TimerPropsI {
  handleOnStartFn: () => void;
  handleOnPauseFn: () => void;
  handleOnFinishFn: () => void;
  handleOnResetFn: () => void;
}

interface TimeI {
  hours: number;
  minutes: number;
  seconds: number;
}

function Timer({
  handleOnStartFn,
  handleOnPauseFn,
  handleOnFinishFn,
  handleOnResetFn
}: TimerPropsI): React.JSX.Element {
  const initialTime: TimeI = { hours: 0, minutes: 0, seconds: 0 };
  const [timeSt, setTimeSt] = useState<TimeI>(initialTime);

  const [isActiveSt, setIsActiveSt] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isActiveSt) {
      intervalId = setInterval(() => {
        setTimeSt(({ hours, minutes, seconds }) => {
          const newSeconds = seconds + 1;
          const newMinutes = minutes + Math.floor(newSeconds / 60);
          const newHours = hours + Math.floor(newMinutes / 60);

          return { hours: newHours % 24, minutes: newMinutes % 60, seconds: newSeconds % 60 };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActiveSt]);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <TimerDisplay hours={timeSt.hours} minutes={timeSt.minutes} seconds={timeSt.seconds} />

      <TimerControls
        isActiveSt={isActiveSt}
        handleOnStartFn={() => {
          setIsActiveSt(true);
          handleOnStartFn();
        }}
        handleOnPauseFn={() => {
          setIsActiveSt(false);
          handleOnPauseFn();
        }}
        handleOnFinishFn={() => {
          setIsActiveSt(false);
          setTimeSt(initialTime);
          handleOnFinishFn();
        }}
        handleOnResetFn={() => {
          setIsActiveSt(false);
          setTimeSt(initialTime);
          handleOnResetFn();
        }}
      />
    </div>
  );
}
export default Timer;
