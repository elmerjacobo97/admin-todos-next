'use client';

import { startTransition, useOptimistic } from 'react';
import { Todo } from '@prisma/client';
import styles from './TodoCard.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoCard = ({ todo, toggleTodo }: Props) => {
  // useOptimistic -> React useOptimistic, nos ayudará a que podamos realizar cambios en el UI aunque no tengamos las respuestas esperadas de procesos asíncronos.
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(todo, (state, newCompletedValue: boolean) => ({
    ...state,
    completed: newCompletedValue,
  }));

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed));
    }
  };

  return (
    <div className={todo.completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div
          // onClick={() => toggleTodo(todo.id, !todo.completed)}
          onClick={onToggleTodo}
          className={`flex p-2 cursor-pointer transition-all rounded-md hover:bg-opacity-60 ${
            todoOptimistic.completed ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {todoOptimistic.completed ? <IoCheckboxOutline size={20} /> : <IoSquareOutline size={20} />}
        </div>
        <div className="text-center sm:text-left text-slate-600">{todoOptimistic.description}</div>
      </div>
    </div>
  );
};
