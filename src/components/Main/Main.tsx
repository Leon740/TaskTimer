/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

import TodosPage from '../Todos/TodosPage';
import SplitsPage from '../Splits/SplitsPage';
import Timer from './Timer/Timer';
import useLocalStorageFn from '../../hooks/useLocalStorageFn';
import PrioritiesContext from '../context/PrioritiesContext';
import { splitI, todoI } from '../../types/types';

// const TODOS_ARR_MOCK = [
//   { id: 0, splitId: 0, priority: 0, label: 'gap', completed: true },
//   { id: 1, splitId: 0, priority: 1, label: 'useLocalStorageFn Expire', completed: true },
//   { id: 2, splitId: 0, priority: 2, label: 'Code Split & Context', completed: false },
//   { id: 3, splitId: 0, priority: 2, label: 'Memo Main', completed: false },
//   { id: 4, splitId: 0, priority: 3, label: "Don' happy be worry", completed: false }
// ];

// const SPLITS_ARR_MOCK = [
//   {
//     id: 0,
//     start: '2023-11-26T03:08:38.350Z',
//     finish: '2023-11-26T03:48:38.350Z',
//     todos: TODOS_ARR_MOCK
//   },
//   {
//     id: 1,
//     start: '2023-11-26T04:08:38.350Z',
//     finish: '2023-11-26T04:48:38.350Z',
//     todos: TODOS_ARR_MOCK
//   }
// ];

const PRIORITIES = [
  {
    id: 0,
    number: 0,
    label: 'Imp Urg',
    color: 'text-red-500',
    border: 'border-red-500',
    background: 'bg-red-500'
  },
  {
    id: 1,
    number: 1,
    label: '!Imp Urg',
    color: 'text-yellow-500',
    border: 'border-yellow-500',
    background: 'bg-yellow-500'
  },
  {
    id: 2,
    number: 2,
    label: 'Imp !Urg',
    color: 'text-blue-500',
    border: 'border-blue-500',
    background: 'bg-blue-500'
  },
  {
    id: 3,
    number: 3,
    label: '!Imp !Urg',
    color: 'text-white',
    border: 'border-white',
    background: 'bg-white'
  }
];

function Main() {
  // page
  const [pageSt, setPageSt] = useState<string>('Main');
  const backBtnOnClickFn = () => setPageSt('Main');

  const splitsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const todosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const className =
      'absolute z-100 top-0 left-0 w-full h-full bg-neutral-900 overflow-auto transition-transform ';

    const negativeTYClassName = '-translate-y-full';
    const zeroTYClassName = 'translate-y-0';
    const positiveTYClassName = 'translate-y-full';

    if (pageSt === 'Splits') {
      splitsRef.current!.className = className + zeroTYClassName;
      todosRef.current!.className = className + positiveTYClassName;
    } else if (pageSt === 'Main') {
      splitsRef.current!.className = className + negativeTYClassName;
      todosRef.current!.className = className + positiveTYClassName;
    } else if (pageSt === 'Todos') {
      splitsRef.current!.className = className + negativeTYClassName;
      todosRef.current!.className = className + zeroTYClassName;
    }
  }, [pageSt]);

  // todosArr
  const [todosStorageSt, setTodosStorageSt] = useLocalStorageFn(
    'todosStorageSt',
    [],
    // 1 week
    7 * 24 * 60 * 60 * 1000
  );
  const [todosSt, setTodosSt] = useState<todoI[]>(todosStorageSt);
  useEffect(() => {
    setTodosStorageSt(todosSt);
  }, [setTodosStorageSt, todosSt]);

  // splitsArr
  const [splitsStorageSt, setSplitsStorageSt] = useLocalStorageFn(
    'splitsStorageSt',
    [],
    // 1 day
    24 * 60 * 60 * 1000
  );
  const [splitsSt, setSplitsSt] = useState<splitI[]>(splitsStorageSt);
  useEffect(() => {
    setSplitsStorageSt(splitsSt);
  }, [setSplitsStorageSt, splitsSt]);

  function addTodoFn(priorityNum: number, labelStr: string) {
    setTodosSt((prevTodos) => [
      ...prevTodos,
      {
        id: prevTodos.length > 0 ? prevTodos[prevTodos.length - 1].id + 1 : 0,
        splitId: splitsSt.length > 0 ? splitsSt[splitsSt.length - 1].id : 0,
        priority: priorityNum,
        label: labelStr,
        completed: false
      }
    ]);
  }

  function toggleTodoFn(id: number) {
    setTodosSt((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      })
    );
  }

  // timer actions
  function splitOnStartFn() {
    setSplitsSt((prevSplits) => [
      ...prevSplits,
      {
        id: prevSplits.length > 0 ? prevSplits[prevSplits.length - 1].id + 1 : 0,
        start: String(new Date()),
        todos: todosSt
      }
    ]);
  }

  function splitOnResetFn() {
    // 1st way: slice
    setSplitsSt((prevSplits) => prevSplits.slice(0, -1));
    // 2nd way: all the splits without 'finish' key
    // setSplitsArraySt((prevSplits) => prevSplits.filter((split) => split.finish));
  }

  function splitOnFinishFn() {
    setSplitsSt((prevSplits) =>
      prevSplits.map((split) => {
        if (split.finish) {
          return split;
        }

        return {
          ...split,
          finish: String(new Date()),
          todos: todosSt.filter((todo) => todo.splitId === split.id && todo.completed)
        };
      })
    );
  }

  return (
    <div className="w-full relative overflow-hidden">
      <PrioritiesContext.Provider value={PRIORITIES}>
        <div ref={splitsRef}>
          <div className="min-h-full container px-lg py-xxl mx-auto flex">
            <div className="w-full flex flex-col items-start">
              <SplitsPage
                backBtnOnClickFn={backBtnOnClickFn}
                splits={splitsSt?.filter((split) => split.finish)}
              />
            </div>
          </div>
        </div>

        <div className="h-full flex flex-col items-center py-xxl" ref={mainRef}>
          <button
            type="button"
            onClick={() => setPageSt('Splits')}
            className="text-sm py-xxs px-xs bg-white text-black rounded-xs"
          >
            Splits
          </button>

          <Timer
            handleOnResetFn={splitOnResetFn}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            handleOnPauseFn={() => {}}
            handleOnStartFn={splitOnStartFn}
            handleOnFinishFn={splitOnFinishFn}
          />

          <button
            type="button"
            onClick={() => setPageSt('Todos')}
            className="text-md py-xxs px-xs bg-white text-black rounded-xs"
          >
            Todos
          </button>
        </div>

        <div ref={todosRef}>
          <div className="min-h-full container px-lg pt-xxl mx-auto flex">
            <div className="w-full flex flex-col items-start justify-between">
              <TodosPage
                backBtnOnClickFn={backBtnOnClickFn}
                todos={todosSt}
                toggleTodoFn={toggleTodoFn}
                addTodoFn={addTodoFn}
              />
            </div>
          </div>
        </div>
      </PrioritiesContext.Provider>
    </div>
  );
}

export default Main;
