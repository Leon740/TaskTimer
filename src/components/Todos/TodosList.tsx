/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useRef } from 'react';
import { priorityI, todoI } from '../../types/types';
import PrioritiesSelect from './PrioritiesSelect';

interface TodoItemPropsI {
  data: todoI;
  priority: priorityI;
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  modifyTodoFn: (id: number, priority: number, label: string) => void;
  isTodosPage?: boolean;
}

function TodoItem({
  data,
  priority,
  toggleTodoFn,
  modifyTodoFn,
  isTodosPage
}: TodoItemPropsI): React.JSX.Element {
  const { id, label, completed } = data;

  // focus
  const prioritiesSelectRef = useRef<HTMLUListElement>(null);

  function onFocusFn() {
    prioritiesSelectRef.current!.className = prioritiesSelectRef.current!.className.replace(
      'translate-x-full',
      'translate-x-0'
    );
  }
  function onBlurFn() {
    prioritiesSelectRef.current!.className = prioritiesSelectRef.current!.className.replace(
      'translate-x-0',
      'translate-x-full'
    );
  }

  // toggling
  const [isToggledSt, setIsToggledSt] = useState(isTodosPage && completed);

  function onToggleFn(): void {
    setIsToggledSt((prev) => !prev);

    // timeout delay = to show the hiding TodoItem animation
    setTimeout(() => {
      toggleTodoFn(id);
    }, 500);
  }

  // input & priority onChange
  const [inputValueSt, setInputValueSt] = useState<string>(label);
  const [activePrioritySt, setActivePrioritySt] = useState<number>(priority!.number);

  function inputOnChangeFn(inputValue: string) {
    setInputValueSt(inputValue);
  }

  function priorityOnChangeFn(priorityNumber: number) {
    setActivePrioritySt(priorityNumber);
  }

  useEffect(() => {
    modifyTodoFn(id, activePrioritySt, inputValueSt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueSt, activePrioritySt]);

  return (
    <li
      // delay-300 = to show the line moving of TodoItem
      className={`w-full flex items-center justify-between text-md overflow-hidden transition-all delay-300  ${
        isToggledSt ? 'py-0 h-0' : 'py-sm h-xxl'
      }`}
    >
      <div className="flex items-center">
        <button
          type="button"
          onClick={onToggleFn}
          aria-label="Toggle Todo"
          title="Toggle Todo"
          className={`w-sm h-sm mr-sm shrink-0 border-1 rounded-full transition-all ${
            priority!.border
          } ${isToggledSt ? priority!.background : ''}`}
        />

        <div className="w-full relative overflow-hidden">
          <span
            className={`w-full h-x absolute translate-y-1/2 top-1/2 left-0 transition-all ${
              priority!.background
            } ${isToggledSt ? 'translate-x-0' : '-translate-x-full'}`}
          />

          <input
            type="text"
            value={inputValueSt}
            onChange={(event) => inputOnChangeFn(event.target.value)}
            onFocus={onFocusFn}
            onBlur={onBlurFn}
            title="Edit Todo"
            // size = workaround for input width to fit content
            size={inputValueSt.length}
            className={`bg-transparent ${priority!.color}`}
          />
        </div>
      </div>

      <PrioritiesSelect
        className="shrink-0 flex gap-xs ml-lg transition-all delay-300 translate-x-full"
        onChange={priorityOnChangeFn}
        ref={prioritiesSelectRef}
      />
    </li>
  );
}

interface TodosListPropsI {
  className?: string;
  priority: priorityI;
  todos: todoI[];
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn?: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  modifyTodoFn?: (id: number, priority: number, label: string) => void;
  isTodosPage?: boolean;
}

function TodosList({
  className = '',
  priority,
  todos,
  toggleTodoFn = () => {},
  modifyTodoFn = () => {},
  isTodosPage
}: TodosListPropsI): React.JSX.Element {
  return (
    // transition-all = to show the hiding TodoList animation
    <ul className={`flex flex-col transition-all ${className}`}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          data={todo}
          priority={priority}
          toggleTodoFn={toggleTodoFn}
          modifyTodoFn={modifyTodoFn}
          isTodosPage={isTodosPage}
        />
      ))}
    </ul>
  );
}
export default TodosList;
