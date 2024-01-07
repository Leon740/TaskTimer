import React, { ForwardRefExoticComponent, RefAttributes, forwardRef, useContext } from 'react';
import PrioritiesContext from '../context/PrioritiesContext';

interface PrioritiesSelectPropsI {
  className: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (priorityNumber: number) => void;
}

const PrioritiesSelect: ForwardRefExoticComponent<
  PrioritiesSelectPropsI & RefAttributes<HTMLUListElement>
> = forwardRef<HTMLUListElement, PrioritiesSelectPropsI>(
  ({ className = '', onChange = () => {} }: PrioritiesSelectPropsI, ref) => {
    const PRIORITIES = useContext(PrioritiesContext);
    PrioritiesSelect.displayName = 'PrioritiesSelect';

    return (
      <ul className={className} ref={ref}>
        {PRIORITIES.map((priority) => (
          <li key={priority.id}>
            <button
              type="button"
              value={priority.number}
              aria-label={priority.label}
              title={priority.label}
              onClick={() => onChange(priority.number)}
              className={`w-sm h-sm rounded-full transition-all hover:scale-110 ${priority.background} ${priority.border}`}
            />
          </li>
        ))}
      </ul>
    );
  }
);

export default PrioritiesSelect;
