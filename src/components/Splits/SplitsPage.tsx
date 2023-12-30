import React, { useContext } from 'react';
import TodosList from '../Todos/TodosList';
import BackBtn from '../common/BackBtn';
import BlankTitle from './BlankTitle';
import { splitI } from '../../types/types';
import PrioritiesContext from '../context/PrioritiesContext';

function getFormattedDateFn(dateArg: number) {
  const date = new Date(dateArg);
  const dateFormatOptions = {
    hour: 'numeric' as const,
    minute: 'numeric' as const
  };
  return new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date);
}

function getTimeFn(ms: number) {
  const minutesNum = Math.floor(ms / 60000) % 60;
  const hoursNum = Math.floor(ms / 3600000) % 24;
  const hoursStr = hoursNum > 0 ? `${hoursNum} h` : '';
  const minutesStr = minutesNum > 0 ? `${minutesNum} min` : '';

  return `${hoursStr} ${minutesStr}`;
}

interface SplitsPagePropsI {
  backBtnOnClickFn: () => void;
  splits: splitI[];
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  modifyTodoFn: (id: number, priority: number, label: string) => void;
}

function SplitsPage({
  backBtnOnClickFn,
  splits,
  toggleTodoFn,
  modifyTodoFn
}: SplitsPagePropsI): React.JSX.Element {
  let totalTimeNum = 0;
  const PRIORITIES = useContext(PrioritiesContext);

  return (
    <>
      <div className="w-full h-full flex flex-col items-start">
        <BackBtn onClickFn={backBtnOnClickFn} />

        {splits?.length > 0 ? (
          <ul className="w-full flex flex-col gap-xxl">
            {splits.map(({ id, start: startStr, finish: finishStr, todos }) => {
              const startNum = new Date(startStr).getTime();
              const finishNum = new Date(finishStr!).getTime();
              const timeDifferenceNum = finishNum - startNum;
              totalTimeNum += timeDifferenceNum;

              return (
                <li key={id}>
                  <section className="flex items-baseline justify-between sm:justify-start mb-lg">
                    <h3 className="text-md lowercase">
                      {getFormattedDateFn(startNum)} - {getFormattedDateFn(finishNum)}
                    </h3>
                    <span className="text-sm ml-lg">{getTimeFn(timeDifferenceNum)}</span>
                  </section>

                  {}

                  {todos.length > 0 ? (
                    PRIORITIES.map(
                      (priority) => {
                        const todosByPriority = todos?.filter(
                          (todo) => todo.completed && todo.priority === priority.number
                        );

                        return (
                          todosByPriority.length > 0 && (
                            <TodosList
                              key={priority.id}
                              priority={priority}
                              todos={todosByPriority}
                              toggleTodoFn={toggleTodoFn}
                              modifyTodoFn={modifyTodoFn}
                            />
                          )
                        );
                      }
                      // <TodosList todos={todos.sort((a, b) => a.priority - b.priority)} />
                    )
                  ) : (
                    <h4 className="text-sm text-red-500">No Todos completed.</h4>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <BlankTitle />
        )}
      </div>

      {splits.length > 0 && <p className="text-md mt-xxl">Total: {getTimeFn(totalTimeNum)}</p>}
    </>
  );
}

export default SplitsPage;
