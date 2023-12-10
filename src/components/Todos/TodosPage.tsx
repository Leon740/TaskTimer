import React, { useContext } from 'react';
import TodosList from './TodosList';
import BackBtn from '../common/BackBtn';
import NewTodo from './NewTodo';
import PrioritiesArrContext from '../context/PrioritiesArrContext';
import { todoObjI } from '../../types/types';

interface TodosPagePropsI {
  backBtnOnClickFn: () => void;
  todosArr: todoObjI[];
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn: (idNum: number) => void;
  // eslint-disable-next-line no-unused-vars
  addTodoFn: (priorityNum: number, labelStr: string) => void;
}

function TodosPage({
  backBtnOnClickFn,
  todosArr,
  toggleTodoFn,
  addTodoFn
}: TodosPagePropsI): React.JSX.Element {
  const prioritiesArr = useContext(PrioritiesArrContext);

  return (
    <>
      <div className="w-full">
        <BackBtn onClickFn={backBtnOnClickFn} />

        <ul>
          {prioritiesArr.map(
            ({
              id: idNum,
              number: priorityNum,
              label: labelStr,
              color: colorStr,
              border: borderStr
            }) => {
              const todosArrByPriority = todosArr?.filter(
                (todoObj) => todoObj.priority === priorityNum
              );

              return (
                <li key={idNum}>
                  <section className={`p-xs mb-1 border-1 ${borderStr}`}>
                    <h4 className={`text-sm ${colorStr}`}>{labelStr}</h4>
                  </section>
                  {todosArrByPriority.length > 0 && (
                    <TodosList
                      classNameStr="py-lg px-xs"
                      sizeStr="sm"
                      todosArr={todosArrByPriority}
                      toggleTodoFn={toggleTodoFn}
                    />
                  )}
                </li>
              );
            }
          )}
        </ul>
      </div>

      <NewTodo addTodoFn={addTodoFn} />
    </>
  );
}

export default TodosPage;
