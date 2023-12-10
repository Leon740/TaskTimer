import React, { useState, useRef, useContext, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import PrioritiesArrContext from '../context/PrioritiesArrContext';

interface NewTodoPropsI {
  // eslint-disable-next-line no-unused-vars
  addTodoFn: (priorityNum: number, labelStr: string) => void;
}

function NewTodo({ addTodoFn }: NewTodoPropsI): React.JSX.Element {
  const inputRfObj = useRef<HTMLInputElement>(null);
  const [inputValueStrSt, setInputValueStrSt] = useState<string>('');

  function inputOnChangeFn(event: ChangeEvent<HTMLInputElement>) {
    setInputValueStrSt(event.target.value);
  }

  const prioritiesArr = useContext(PrioritiesArrContext);

  const [priorityLabelStrSt, setPriorityLabelStrSt] = useState<string>(
    prioritiesArr[prioritiesArr.length - 1].label
  );
  const activePriorityObj = prioritiesArr.find(
    (priorityObj) => priorityObj.label === priorityLabelStrSt
  );

  function handleAddTodoFn() {
    addTodoFn(activePriorityObj!.number, inputValueStrSt);
    setInputValueStrSt('');
    inputRfObj.current?.focus();
  }

  return (
    <div className="w-full sticky bottom-0 z-50 bg-neutral-900 mt-xxl flex items-center before:content=[''] before:h-1 before:absolute before:top-0 before:-left-lg before:-right-lg before:bg-white">
      <button
        type="button"
        onFocus={() => inputRfObj.current?.focus()}
        className="text-md leading-6 mr-sm"
      >
        <FontAwesomeIcon icon={icon({ name: 'circle-plus' })} />
      </button>

      <div className="relative w-full flex items-center">
        <span
          className={`text-md absolute left-0 top-1/2 -translate-y-1/2 ${
            inputValueStrSt ? 'opacity-0' : ''
          }`}
        >
          New Todo
        </span>

        <input
          type="text"
          className="relative z-10 bg-transparent w-full py-lg text-md"
          ref={inputRfObj}
          value={inputValueStrSt}
          onChange={inputOnChangeFn}
        />

        {inputValueStrSt && (
          <>
            <div className="relative">
              <select
                className={`appearance-none relative z-10 bg-transparent border-1 py-xxs pl-xs pr-lg ${
                  activePriorityObj!.color
                } ${activePriorityObj!.border}`}
                value={priorityLabelStrSt}
                onChange={(event) => setPriorityLabelStrSt(event.target.value)}
              >
                {prioritiesArr.map(({ id, label }) => (
                  <option key={id} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              <span
                className={`absolute z-0 top-1/2 -translate-y-1/2 right-xs text-sm ${
                  activePriorityObj!.color
                }`}
              >
                <FontAwesomeIcon icon={icon({ name: 'chevron-down' })} />
              </span>
            </div>

            {priorityLabelStrSt && (
              <button
                type="button"
                className="text-green-500 text-md ml-sm"
                aria-label="add Todo"
                onClick={handleAddTodoFn}
              >
                <FontAwesomeIcon icon={icon({ name: 'check' })} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default NewTodo;
