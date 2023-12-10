import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

interface TimerPropsI {
  handleOnResetFn: () => void;
  handleOnPauseFn: () => void;
  handleOnStartFn: () => void;
  handleOnFinishFn: () => void;
}

interface TimeObjI {
  hours: number;
  minutes: number;
  seconds: number;
}

function Timer({
  handleOnResetFn,
  handleOnPauseFn,
  handleOnStartFn,
  handleOnFinishFn
}: TimerPropsI): React.JSX.Element {
  const initialTimeObj: TimeObjI = { hours: 0, minutes: 0, seconds: 0 };
  const [timeObjSt, setTimeObjSt] = useState<TimeObjI>(initialTimeObj);

  const [isActiveBoolSt, setIsActiveBoolSt] = useState<boolean>(false);

  useEffect(() => {
    let intervalIdNum: ReturnType<typeof setInterval>;

    if (isActiveBoolSt) {
      intervalIdNum = setInterval(() => {
        setTimeObjSt(({ hours, minutes, seconds }) => {
          const newSecondsNum = seconds + 1;
          const newMinutesNum = minutes + Math.floor(newSecondsNum / 60);
          const newHours = hours + Math.floor(newMinutesNum / 60);

          return { hours: newHours % 24, minutes: newMinutesNum % 60, seconds: newSecondsNum % 60 };
        });
      }, 1000);
    }

    return () => clearInterval(intervalIdNum);
  }, [isActiveBoolSt]);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <TimerDisplay
        hours={timeObjSt.hours}
        minutes={timeObjSt.minutes}
        seconds={timeObjSt.seconds}
      />

      <TimerControls
        isActiveBoolSt={isActiveBoolSt}
        handleOnStartFn={() => {
          setIsActiveBoolSt(true);
          handleOnStartFn();
        }}
        handleOnPauseFn={() => {
          setIsActiveBoolSt(false);
          handleOnPauseFn();
        }}
        handleOnResetFn={() => {
          setIsActiveBoolSt(false);
          setTimeObjSt(initialTimeObj);
          handleOnResetFn();
        }}
        handleOnFinishFn={() => {
          setIsActiveBoolSt(false);
          setTimeObjSt(initialTimeObj);
          handleOnFinishFn();
        }}
      />
    </div>
  );
}
export default Timer;
