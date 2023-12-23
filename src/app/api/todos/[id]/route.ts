import * as yup from 'yup';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../lib/prisma';
import { Todo } from '@prisma/client';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  });

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  // const { id } = params;

  // const todo = await prisma.todo.findFirst({
  //   // findUnique
  //   where: {
  //     id: id,
  //   },
  // });

  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ message: `Todo with ${params.id} not found` }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await prisma.todo.findFirst({
    // findUnique
    where: {
      id: id,
    },
  });

  if (!todo) {
    return NextResponse.json({ message: `Todo with ${id} not found` }, { status: 404 });
  }

  try {
    const { description, completed, ...rest } = await putSchema.validate(await request.json());

    // Actualizar
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: { description, completed },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
