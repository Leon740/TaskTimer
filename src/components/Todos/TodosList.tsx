import React, { useContext } from 'react';
import PrioritiesArrContext from '../context/PrioritiesArrContext';
import { todoObjI } from '../../types/types';

interface TodosListPropsI {
  classNameStr?: string;
  sizeStr: 'xl' | 'sm';
  todosArr: todoObjI[];
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn?: (idNum: number) => void;
}

function TodosList({
  classNameStr = '',
  sizeStr = 'xl',
  todosArr,
  toggleTodoFn = () => {}
}: TodosListPropsI): React.JSX.Element {
  const prioritiesArr = useContext(PrioritiesArrContext);

  return (
    <ul
      className={`flex flex-col ${
        sizeStr === 'xl' ? 'gap-lg' : 'gap-sm lg:gap-lg'
      } ${classNameStr}`}
    >
      {todosArr.map(
        ({ id: idNum, label: labelStr, priority: priorityNum, completed: completedBool }) => {
          const activePriorityObj = prioritiesArr.find(
            (priorityObj) => priorityObj.number === priorityNum
          );

          return (
            <li
              key={idNum}
              className={`flex items-center ${
                sizeStr === 'xl' ? 'text-md' : 'text-sm lg:text-md'
              } `}
            >
              <button
                type="button"
                onClick={() => toggleTodoFn(idNum)}
                aria-label="Toggle Todo"
                className={`
            ${
              sizeStr === 'xl' ? 'w-sm h-sm mr-sm' : 'w-xs h-xs mr-xs lg:w-sm lg:h-sm lg:mr-sm'
            } shrink-0 border-1 border-white rounded-full
            ${completedBool ? 'bg-green-500' : ''}`}
              />
              <span className={activePriorityObj!.color}>{labelStr}</span>
            </li>
          );
        }
      )}
    </ul>
  );
}
export default TodosList;
