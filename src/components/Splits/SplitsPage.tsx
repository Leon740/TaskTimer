import React from 'react';
import TodosList from '../Todos/TodosList';
import BackBtn from '../common/BackBtn';
import BlankTitle from './BlankTitle';
import { splitObjI } from '../../types/types';

function getFormattedDateFn(dateStr: number) {
  const dateDt = new Date(dateStr);
  const dateFormatOptionsObj = {
    hour: 'numeric' as const,
    minute: 'numeric' as const
  };
  return new Intl.DateTimeFormat('en-US', dateFormatOptionsObj).format(dateDt);
}

function getTimeStrFn(timeMsNum: number) {
  const minutesNum = Math.floor(timeMsNum / 60000) % 60;
  const hoursNum = Math.floor(timeMsNum / 3600000) % 24;
  const hoursStr = hoursNum > 0 ? `${hoursNum} h` : '';
  const minutesStr = minutesNum > 0 ? `${minutesNum} min` : '';

  return `${hoursStr} ${minutesStr}`;
}

interface SplitsPagePropsI {
  backBtnOnClickFn: () => void;
  splitsArr: splitObjI[];
}

function SplitsPage({ backBtnOnClickFn, splitsArr }: SplitsPagePropsI): React.JSX.Element {
  let totalTimeNum = 0;

  return (
    <>
      <div className="w-full h-full flex flex-col items-start">
        <BackBtn onClickFn={backBtnOnClickFn} />

        {splitsArr?.length > 0 ? (
          <ul className="flex flex-col gap-xxl">
            {splitsArr.map(({ id: idNum, start: startStr, finish: finishStr, todos: todosArr }) => {
              const startNum = new Date(startStr).getTime();
              const finishNum = new Date(finishStr!).getTime();
              const timeDifferenceNum = finishNum - startNum;
              totalTimeNum += timeDifferenceNum;

              return (
                <li key={idNum}>
                  <section className="flex items-baseline justify-between sm:justify-start mb-lg">
                    <h3 className="text-md">
                      {getFormattedDateFn(startNum)} - {getFormattedDateFn(finishNum)}
                    </h3>
                    <span className="text-sm ml-lg">{getTimeStrFn(timeDifferenceNum)}</span>
                  </section>
                  {todosArr.length > 0 ? (
                    <TodosList
                      sizeStr="xl"
                      todosArr={todosArr.sort((a, b) => a.priority - b.priority)}
                    />
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

      {splitsArr.length > 0 && (
        <p className="text-md mt-xxl">Total: {getTimeStrFn(totalTimeNum)}</p>
      )}
    </>
  );
}

export default SplitsPage;
