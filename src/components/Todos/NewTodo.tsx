import React, { useState, useRef, useContext, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import PrioritiesContext from '../context/PrioritiesContext';

interface NewTodoPropsI {
  // eslint-disable-next-line no-unused-vars
  addTodoFn: (priorityNumber: number, label: string) => void;
}

function NewTodo({ addTodoFn }: NewTodoPropsI): React.JSX.Element {
  const prioritiesSelectRef = useRef<HTMLUListElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValueSt, setInputValueSt] = useState<string>('');

  function inputOnChangeFn(event: ChangeEvent<HTMLInputElement>) {
    setInputValueSt(event.target.value);
  }

  function inputOnFocusFn() {
    inputRef.current!.focus();
    prioritiesSelectRef.current!.className = prioritiesSelectRef.current!.className.replace(
      'h-0',
      'h-[120px]'
    );
  }
  function inputOnBlurFn() {
    prioritiesSelectRef.current!.className = prioritiesSelectRef.current!.className.replace(
      'h-[120px]',
      'h-0'
    );
  }

  const PRIORITIES = useContext(PrioritiesContext);

  const [priorityNumberSt, setPriorityNumberSt] = useState<number>(
    PRIORITIES[PRIORITIES.length - 1].number
  );
  const activePriority = PRIORITIES.find((priority) => priority.number === priorityNumberSt);

  function handleAddTodoFn() {
    addTodoFn(priorityNumberSt, inputValueSt);
    setInputValueSt('');
    inputOnFocusFn();
  }

  return (
    <div className="w-full sticky bottom-0 z-50 bg-neutral-900 mt-xxl flex items-center before:content=[''] before:h-1 before:absolute before:top-0 before:-left-lg before:-right-lg before:bg-white sm:before:left-0 sm:before:right-0">
      <button
        type="button"
        onFocus={inputOnFocusFn}
        className={`text-md leading-6 mr-sm transition-all ${activePriority!.color}`}
      >
        <FontAwesomeIcon icon={icon({ name: 'circle-plus' })} />
      </button>

      {/* delay-300 = workaround of prioritiesSelectOnChange */}
      <ul
        ref={prioritiesSelectRef}
        className="absolute z-10 left-xxs top-lg flex flex-col gap-xs transition-all delay-300 -translate-y-full overflow-hidden h-0"
      >
        {PRIORITIES.map(({ id, number, label, background, border }) => (
          <li key={id}>
            <button
              type="button"
              value={number}
              aria-label={label}
              onClick={() => {
                setPriorityNumberSt(number);
                inputOnFocusFn();
              }}
              className={`w-sm h-sm rounded-full ${background} ${border}`}
            />
          </li>
        ))}
      </ul>

      <div className="relative w-full flex items-center">
        <input
          type="text"
          ref={inputRef}
          value={inputValueSt}
          onChange={inputOnChangeFn}
          onFocus={inputOnFocusFn}
          onBlur={inputOnBlurFn}
          className="relative z-10 bg-transparent w-full py-lg text-md"
        />

        {inputValueSt ? (
          <button
            type="button"
            className="text-green-500 text-md ml-sm"
            aria-label="add Todo"
            onClick={handleAddTodoFn}
          >
            <FontAwesomeIcon icon={icon({ name: 'check' })} />
          </button>
        ) : (
          <span className="text-md absolute left-0 top-1/2 -translate-y-1/2">New Todo</span>
        )}
      </div>
    </div>
  );
}
export default NewTodo;
