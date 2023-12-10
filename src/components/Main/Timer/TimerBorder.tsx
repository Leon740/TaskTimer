import React from 'react';

interface TimerBorderPropsI {
  percentageNum: number;
}

function TimerBorder({ percentageNum }: TimerBorderPropsI): React.JSX.Element {
  return (
    <>
      {/* circle */}
      <span className="absolute top-0 left-0 w-full h-full rounded-full border-xxs border-gray-500" />

      {/* cover red */}
      <span
        className={`absolute top-0 left-0 w-128 h-256 rounded-l-128 border-xxs border-r-0 border-gray-500 z-30 ${
          percentageNum <= 50 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 0-180: red */}
      <span
        className="absolute top-0 left-0 w-full h-full transition-transform z-20"
        style={{
          transform: `rotate(${percentageNum <= 50 && (360 * percentageNum) / 100}deg)`
        }}
      >
        <span className="absolute top-0 left-0 w-128 h-full rounded-l-128 border-xxs border-r-0 border-white" />
      </span>

      {/* 180-360: blue */}
      <span
        className={`absolute top-0 left-0 w-full h-full transition-transform z-10 ${
          percentageNum <= 50 ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          transform: `rotate(${(360 * percentageNum) / 100}deg)`
        }}
      >
        <span className="absolute top-0 left-0 w-128 h-full rounded-l-128 border-xxs border-r-0 border-white" />
      </span>
    </>
  );
}
export default TimerBorder;
