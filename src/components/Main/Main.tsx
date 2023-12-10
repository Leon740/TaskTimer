/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

import TodosPage from '../Todos/TodosPage';
import SplitsPage from '../Splits/SplitsPage';
import Timer from './Timer/Timer';
import useLocalStorageFn from '../../hooks/useLocalStorageFn';
import PrioritiesArrContext from '../context/PrioritiesArrContext';
import { splitObjI, todoObjI } from '../../types/types';

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

const PRIORITIES_ARR = [
  {
    id: 0,
    number: 0,
    label: 'Imp Urg',
    color: 'text-red-500',
    border: 'border-red-500'
  },
  {
    id: 1,
    number: 1,
    label: '!Imp Urg',
    color: 'text-yellow-500',
    border: 'border-yellow-500'
  },
  {
    id: 2,
    number: 2,
    label: 'Imp !Urg',
    color: 'text-blue-500',
    border: 'border-blue-500'
  },
  {
    id: 3,
    number: 3,
    label: '!Imp !Urg',
    color: 'text-white',
    border: 'border-white'
  }
];

function Main() {
  // page
  const [pageStrSt, setPageStrSt] = useState<string>('Main');
  const backBtnOnClickFn = () => setPageStrSt('Main');

  const splitsRf = useRef<HTMLDivElement>(null);
  const mainRf = useRef<HTMLDivElement>(null);
  const todosRf = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const classNameStr =
      'absolute z-100 top-0 left-0 w-full h-full bg-neutral-900 overflow-auto transition-transform ';

    const negativeTranslateYClassNameStr = '-translate-y-full';
    const zeroTranslateYClassNameStr = 'translate-y-0';
    const positiveTranslateYClassNameStr = 'translate-y-full';

    if (pageStrSt === 'Splits') {
      splitsRf.current!.className = classNameStr + zeroTranslateYClassNameStr;
      todosRf.current!.className = classNameStr + positiveTranslateYClassNameStr;
    } else if (pageStrSt === 'Main') {
      splitsRf.current!.className = classNameStr + negativeTranslateYClassNameStr;
      todosRf.current!.className = classNameStr + positiveTranslateYClassNameStr;
    } else if (pageStrSt === 'Todos') {
      splitsRf.current!.className = classNameStr + negativeTranslateYClassNameStr;
      todosRf.current!.className = classNameStr + zeroTranslateYClassNameStr;
    }
  }, [pageStrSt]);

  // todosArr
  const [todosArrStorageSt, setTodosArrStorageSt] = useLocalStorageFn(
    'todosArrStorageSt',
    [],
    // 1 week
    7 * 24 * 60 * 60 * 1000
  );
  const [todosArrSt, setTodosArrSt] = useState<todoObjI[]>(todosArrStorageSt);
  useEffect(() => {
    setTodosArrStorageSt(todosArrSt);
  }, [setTodosArrStorageSt, todosArrSt]);

  // splitsArr
  const [splitsArrStorageSt, setSplitsArrStorageSt] = useLocalStorageFn(
    'splitsArrStorageSt',
    [],
    // 1 day
    24 * 60 * 60 * 1000
  );
  const [splitsArrSt, setSplitsArrSt] = useState<splitObjI[]>(splitsArrStorageSt);
  useEffect(() => {
    setSplitsArrStorageSt(splitsArrSt);
  }, [setSplitsArrStorageSt, splitsArrSt]);

  function addTodoFn(priorityNum: number, labelStr: string) {
    setTodosArrSt((prevTodosArr) => [
      ...prevTodosArr,
      {
        id: prevTodosArr.length > 0 ? prevTodosArr[prevTodosArr.length - 1].id + 1 : 0,
        splitId: splitsArrSt.length > 0 ? splitsArrSt[splitsArrSt.length - 1].id : 0,
        priority: priorityNum,
        label: labelStr,
        completed: false
      }
    ]);
  }

  function toggleTodoFn(id: number) {
    setTodosArrSt((prevTodosArr) =>
      prevTodosArr.map((todoObj) => {
        if (todoObj.id === id) {
          return { ...todoObj, completed: !todoObj.completed };
        }

        return todoObj;
      })
    );
  }

  // timer actions
  function splitOnStartFn() {
    setSplitsArrSt((prevSplitsArr) => [
      ...prevSplitsArr,
      {
        id: prevSplitsArr.length > 0 ? prevSplitsArr[prevSplitsArr.length - 1].id + 1 : 0,
        start: String(new Date()),
        todos: todosArrSt
      }
    ]);
  }

  function splitOnResetFn() {
    // 1st way: slice
    setSplitsArrSt((prevSplitsArr) => prevSplitsArr.slice(0, -1));
    // 2nd way: all the splits without 'finish' key
    // setSplitsArraySt((prevSplits) => prevSplits.filter((split) => split.finish));
  }

  function splitOnFinishFn() {
    setSplitsArrSt((prevSplitsArr) =>
      prevSplitsArr.map((splitObj) => {
        if (splitObj.finish) {
          return splitObj;
        }

        return {
          ...splitObj,
          finish: String(new Date()),
          todos: todosArrSt.filter(
            (todoObj) => todoObj.splitId === splitObj.id && todoObj.completed
          )
        };
      })
    );
  }

  return (
    <div className="w-full relative overflow-hidden">
      <PrioritiesArrContext.Provider value={PRIORITIES_ARR}>
        <div ref={splitsRf}>
          <div className="min-h-full container px-lg py-xxl mx-auto flex">
            <div className="w-full flex flex-col items-start">
              <SplitsPage
                backBtnOnClickFn={backBtnOnClickFn}
                splitsArr={splitsArrSt?.filter((splitObj) => splitObj.finish)}
              />
            </div>
          </div>
        </div>

        <div className="h-full flex flex-col items-center py-xxl" ref={mainRf}>
          <button
            type="button"
            onClick={() => setPageStrSt('Splits')}
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
            onClick={() => setPageStrSt('Todos')}
            className="text-md py-xxs px-xs bg-white text-black rounded-xs"
          >
            Todos
          </button>
        </div>

        <div ref={todosRf}>
          <div className="min-h-full container px-lg pt-xxl mx-auto flex">
            <div className="w-full flex flex-col items-start justify-between">
              <TodosPage
                backBtnOnClickFn={backBtnOnClickFn}
                todosArr={todosArrSt}
                toggleTodoFn={toggleTodoFn}
                addTodoFn={addTodoFn}
              />
            </div>
          </div>
        </div>
      </PrioritiesArrContext.Provider>
    </div>
  );
}

export default Main;
