'use client';

import { Todo } from '@prisma/client';
import { TodoCard } from './TodoCard';
// import * as todoApi from '@/todos/helpers/todos';
import { useRouter } from 'next/navigation';
import { toggleTodo } from '../actions/todo-actions';

interface Props {
  todos: Todo[];
}

export const TodosGrid = ({ todos }: Props) => {
  const router = useRouter();

  // const toggleTodo = async (id: string, completed: boolean) => {
  //   const updatedTodo = await todoApi.updateTodo(id, completed);
  //   router.refresh(); // Refrescar la página para mostrar el nuevo estado
  // };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {todos.length > 0 ? (
        todos.map((todo) => <TodoCard todo={todo} key={todo.id} toggleTodo={toggleTodo} />)
      ) : (
        <p className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center text-gray-600">No hay tareas pendientes.</p>
      )}
    </div>
  );
};
