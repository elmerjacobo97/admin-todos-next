'use server';

import { Todo } from '@prisma/client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw new Error(`Todo with ${id} not found`);
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      completed,
    },
  });

  // Revalidar el path del cache en next
  revalidatePath('/dashboard/server-todos');

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
      },
    });

    revalidatePath('/dashboard/server-todos');

    return todo;
  } catch (error) {
    return {
      message: 'Error creating todo',
    };
  }
};

export const deleteCompletedTodos = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: {
        completed: true,
      },
    });
    revalidatePath('/dashboard/server-todos');
  } catch (error) {
    console.error('Error deleting todos:', error);
  }
};
