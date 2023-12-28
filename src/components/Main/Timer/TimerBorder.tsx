import React from 'react';

interface TimerBorderPropsI {
  percentage: number;
}

function TimerBorder({ percentage }: TimerBorderPropsI): React.JSX.Element {
  return (
    <>
      {/* circle */}
      <span className="absolute top-0 left-0 w-full h-full rounded-full border-xxs border-gray-500" />

      {/* cover red */}
      <span
        className={`absolute top-0 left-0 w-128 h-256 rounded-l-128 border-xxs border-r-0 border-gray-500 z-30 ${
          percentage <= 50 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 0-180: red */}
      <span
        className="absolute top-0 left-0 w-full h-full transition-transform z-20"
        style={{
          transform: `rotate(${percentage <= 50 && (360 * percentage) / 100}deg)`
        }}
      >
        <span className="absolute top-0 left-0 w-128 h-full rounded-l-128 border-xxs border-r-0 border-white" />
      </span>

      {/* 180-360: blue */}
      <span
        className={`absolute top-0 left-0 w-full h-full transition-transform z-10 ${
          percentage <= 50 ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          transform: `rotate(${(360 * percentage) / 100}deg)`
        }}
      >
        <span className="absolute top-0 left-0 w-128 h-full rounded-l-128 border-xxs border-r-0 border-white" />
      </span>
    </>
  );
}
export default TimerBorder;
