import React, { useContext } from 'react';
import TodosList from './TodosList';
import BackBtn from '../common/BackBtn';
import NewTodo from './NewTodo';
import PrioritiesContext from '../context/PrioritiesContext';
import { todoI } from '../../types/types';

interface TodosPagePropsI {
  backBtnOnClickFn: () => void;
  todos: todoI[];
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn: (idNum: number) => void;
  // eslint-disable-next-line no-unused-vars
  addTodoFn: (priorityNum: number, labelStr: string) => void;
}

function TodosPage({
  backBtnOnClickFn,
  todos,
  toggleTodoFn,
  addTodoFn
}: TodosPagePropsI): React.JSX.Element {
  const PRIORITIES = useContext(PrioritiesContext);

  return (
    <>
      <div className="w-full">
        <BackBtn onClickFn={backBtnOnClickFn} />

        <ul>
          {PRIORITIES.map(({ id, number, label, color, border }) => {
            const todosByPriority = todos?.filter(
              (todo) => !todo.completed && todo.priority === number
            );

            return (
              <li key={id}>
                <section className={`p-xs mb-1 border-1 ${border}`}>
                  <h4 className={`text-sm ${color}`}>{label}</h4>
                </section>
                {todosByPriority.length > 0 && (
                  <TodosList
                    className="py-lg px-xs"
                    todos={todosByPriority}
                    toggleTodoFn={toggleTodoFn}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <NewTodo addTodoFn={addTodoFn} />
    </>
  );
}

export default TodosPage;
