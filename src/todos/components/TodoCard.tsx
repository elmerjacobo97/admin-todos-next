'use client';

import { Todo } from '@prisma/client';
import styles from './TodoCard.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoCard = ({ todo, toggleTodo }: Props) => {
  return (
    <div className={todo.completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div
          onClick={() => toggleTodo(todo.id, !todo.completed)}
          className={`flex p-2 cursor-pointer transition-all rounded-md hover:bg-opacity-60 ${todo.completed ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {todo.completed ? <IoCheckboxOutline size={20} /> : <IoSquareOutline size={20} />}
        </div>
        <div className="text-center sm:text-left text-slate-600">{todo.description}</div>
      </div>
    </div>
  );
};
