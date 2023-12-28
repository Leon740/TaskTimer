import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

interface TimerSelectPropsI {
  value: number;
  onChangeFn: Dispatch<SetStateAction<number>>;
}

function TimerSelect({ value, onChangeFn }: TimerSelectPropsI): React.JSX.Element {
  return (
    <div className="relative">
      <select
        className="appearance-none relative z-10 bg-transparent border-1 border-white py-xxs pl-xs pr-lg"
        value={value}
        onChange={(event) => onChangeFn(Number(event.target.value))}
      >
        {[30, 45, 60].map((num) => (
          <option key={num} value={num}>
            {num} min
          </option>
        ))}
      </select>
      <span className="absolute z-0 top-1/2 -translate-y-1/2 right-xs text-sm">
        <FontAwesomeIcon icon={icon({ name: 'chevron-down' })} />
      </span>
    </div>
  );
}

export default TimerSelect;
