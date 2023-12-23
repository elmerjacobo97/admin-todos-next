import * as yup from 'yup';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(request: Request) {
  // Leer query params
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') ?? '10'); // convertir a number
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(skip)) {
    return NextResponse.json({ message: 'Invalid skip value' }, { status: 400 });
  }

  if (isNaN(take)) {
    return NextResponse.json({ message: 'Invalid take value' }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });

  return NextResponse.json(todos);
}

// Validation with Yup
const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await postSchema.validate(await request.json());
    // const { description, completed } = await postSchema.validate(await request.json());

    const todo = await prisma.todo.create({
      data: body,
    });

    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
