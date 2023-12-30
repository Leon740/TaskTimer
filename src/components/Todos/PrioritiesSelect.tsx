import React, { forwardRef, useContext } from 'react';
import PrioritiesContext from '../context/PrioritiesContext';

interface PrioritiesSelectPropsI {
  className: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (priorityNumber: number) => void;
}

const PrioritiesSelect = forwardRef(
  ({ className = '', onChange = () => {} }: PrioritiesSelectPropsI, ref) => {
    const PRIORITIES = useContext(PrioritiesContext);

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <ul className={className} ref={ref}>
        {PRIORITIES.map((priority) => (
          <li key={priority.id}>
            <button
              type="button"
              value={priority.number}
              aria-label={priority.label}
              title={priority.label}
              onClick={() => onChange(priority.number)}
              className={`w-sm h-sm rounded-full ${priority.background} ${priority.border}`}
            />
          </li>
        ))}
      </ul>
    );
  }
);

export default PrioritiesSelect;
