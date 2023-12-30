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
  addTodoFn: (priority: number, label: string) => void;
  // eslint-disable-next-line no-unused-vars
  toggleTodoFn: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  modifyTodoFn: (id: number, priority: number, label: string) => void;
}

function TodosPage({
  backBtnOnClickFn,
  todos,
  addTodoFn,
  toggleTodoFn,
  modifyTodoFn
}: TodosPagePropsI): React.JSX.Element {
  const PRIORITIES = useContext(PrioritiesContext);

  return (
    <>
      <div className="w-full">
        <BackBtn onClickFn={backBtnOnClickFn} />

        <ul>
          {PRIORITIES.map((priority) => {
            const todosByPriority = todos?.filter(
              (todo) => !todo.completed && todo.priority === priority.number
            );

            return (
              <li key={priority.id}>
                <section className={`p-xs mb-1 border-1 ${priority.border}`}>
                  <h4 className={`text-sm ${priority.color}`}>{priority.label}</h4>
                </section>
                {todosByPriority.length > 0 && (
                  <TodosList
                    className="py-sm"
                    priority={priority}
                    todos={todosByPriority}
                    toggleTodoFn={toggleTodoFn}
                    modifyTodoFn={modifyTodoFn}
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
