import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo

  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma', completed: true },
      { description: 'Piedra del tiempo' },
      { description: 'Piedra del espacio' },
      { description: 'Piedra del poder' },
      { description: 'Piedra del infinito', completed: true },
      { description: 'Piedra del valor' },
    ],
  });

  // const todo = await prisma.todo.create({
  //   data: {
  //     description: 'Piedra del alma',
  //   },
  // });

  // console.log({ todo });

  return NextResponse.json({ message: 'Seed executed' });
}
