/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/require-default-props */
import React, { useContext, useRef } from 'react';
import PrioritiesContext from '../context/PrioritiesContext';
import { todoI } from '../../types/types';

interface TodoItemPropsI {
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn: (idNum: number) => void;
  data: todoI;
  priorities: {
    id: number;
    number: number;
    label: string;
    color: string;
    border: string;
    background: string;
  }[];
}

function TodoItem({ toggleTodoFn, data, priorities }: TodoItemPropsI): React.JSX.Element {
  const { id, label, priority: priorityNumber, completed } = data;

  const activePriority = priorities.find((priority) => priority.number === priorityNumber);

  // TODO: remove activePriority, use a prop for dividing the TodosPage & SplitsPage
  // Todo edit label, priority

  const parentRef = useRef<HTMLLIElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  function onClickFn(): void {
    lineRef.current!.className = lineRef.current!.className.replace(
      '-translate-x-full',
      'translate-x-0'
    );
    parentRef.current!.className = parentRef.current!.className.replace('py-sm h-xxl', 'py-0 h-0');

    // timeout delay used to show the hiding TodoItem animation
    setTimeout(() => {
      toggleTodoFn(id);
    }, 500);
  }

  return (
    <li
      ref={parentRef}
      className="flex items-center text-md overflow-hidden transition-all delay-300 py-sm h-xxl"
    >
      <button
        type="button"
        onClick={onClickFn}
        aria-label="Toggle Todo"
        className={`w-sm h-sm mr-sm shrink-0 border-1 rounded-full ${activePriority!.border} ${
          completed ? activePriority!.background : ''
        }`}
      />
      <button
        type="button"
        onClick={() => {}}
        className={`relative overflow-hidden ${activePriority!.color}`}
      >
        {label}
        <span
          ref={lineRef}
          className={`w-full h-x absolute top-1/2 translate-y-1/2 left-0 transition-all ${
            activePriority!.background
          } -translate-x-full`}
        />
      </button>
    </li>
  );
}

interface TodosListPropsI {
  className?: string;
  todos: todoI[];
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn?: (idNum: number) => void;
}

function TodosList({
  className = '',
  todos,
  toggleTodoFn = () => {}
}: TodosListPropsI): React.JSX.Element {
  const PRIORITIES = useContext(PrioritiesContext);

  return (
    <ul className={`flex flex-col transition-all ${className}`}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} toggleTodoFn={toggleTodoFn} data={todo} priorities={PRIORITIES} />
      ))}
    </ul>
  );
}
export default TodosList;
