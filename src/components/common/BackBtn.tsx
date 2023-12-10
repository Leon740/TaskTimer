import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import useEventListener from '../../hooks/useEventListenerFn';

interface BackBtnPropsI {
  onClickFn: () => void;
}

function BackBtn({ onClickFn }: BackBtnPropsI): React.JSX.Element {
  useEventListener(
    'mouseup',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (event.button === 3) {
        onClickFn();
      }
    },
    window
  );

  return (
    <button
      type="button"
      onClick={onClickFn}
      className="text-lg leading-8 sticky top-xxl z-50 mb-xxl"
    >
      <FontAwesomeIcon icon={icon({ name: 'circle-arrow-left' })} />
    </button>
  );
}
export default BackBtn;
