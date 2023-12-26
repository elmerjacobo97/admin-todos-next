// revalidar cache
export const dynamic = 'force-dynamic'; // default: auto
export const revalidate = 0; // default: false

import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NewTodo } from '@/todos';
import { TodosGrid } from '@/todos/components/TodosGrid';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos de la base de datos',
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer();

  if (!user) {
    redirect('/api/auth/signin');
  }

  const todos = await prisma.todo.findMany({ where: { userId: user.id }, orderBy: { description: 'asc' } });
  return (
    <>
      <NewTodo />
      <TodosGrid todos={todos} />
    </>
  );
}
