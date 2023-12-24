import prisma from '@/lib/prisma';
import { NewTodo } from '@/todos';
import { TodosGrid } from '@/todos/components/TodosGrid';

export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos de la base de datos',
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <>
      <NewTodo />
      <TodosGrid todos={todos} />
    </>
  );
}
