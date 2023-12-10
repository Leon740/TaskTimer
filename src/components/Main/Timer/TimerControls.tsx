import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

interface TimerControlsPropsI {
  isActiveBoolSt: boolean;
  handleOnResetFn: () => void;
  handleOnPauseFn: () => void;
  handleOnStartFn: () => void;
  handleOnFinishFn: () => void;
}

function TimerControls({
  isActiveBoolSt,
  handleOnResetFn,
  handleOnPauseFn,
  handleOnStartFn,
  handleOnFinishFn
}: TimerControlsPropsI): React.JSX.Element {
  return (
    <div className="flex items-center justify-center gap-xl mt-xxl">
      {isActiveBoolSt && (
        <button
          type="button"
          aria-label="Reset split"
          onClick={handleOnResetFn}
          className="text-md text-red-500"
        >
          <FontAwesomeIcon icon={icon({ name: 'arrow-rotate-left' })} />
        </button>
      )}

      {isActiveBoolSt ? (
        <button
          type="button"
          aria-label="Pause timer"
          onClick={handleOnPauseFn}
          className="text-xxl leading-4"
        >
          <FontAwesomeIcon icon={icon({ name: 'circle-pause' })} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Start timer"
          onClick={handleOnStartFn}
          className="text-xxl leading-4"
        >
          <FontAwesomeIcon icon={icon({ name: 'circle-play' })} />
        </button>
      )}

      {isActiveBoolSt && (
        <button
          type="button"
          aria-label="Finish timer"
          onClick={handleOnFinishFn}
          className="text-md text-green-500"
        >
          <FontAwesomeIcon icon={icon({ name: 'check' })} />
        </button>
      )}
    </div>
  );
}
export default TimerControls;
