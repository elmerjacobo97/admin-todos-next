import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.user.deleteMany(); // delete * from user

  const user = await prisma.user.create({
    data: {
      name: 'Elmer',
      email: 'elmer@google.com',
      password: bcrypt.hashSync('123456', 10),
      roles: ['admin', 'client', 'user', 'super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', completed: true },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del poder' },
          { description: 'Piedra del infinito', completed: true },
          { description: 'Piedra del valor' },
        ],
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'Piedra del alma', completed: true },
  //     { description: 'Piedra del tiempo' },
  //     { description: 'Piedra del espacio' },
  //     { description: 'Piedra del poder' },
  //     { description: 'Piedra del infinito', completed: true },
  //     { description: 'Piedra del valor' },
  //   ],
  // });

  // const todo = await prisma.todo.create({
  //   data: {
  //     description: 'Piedra del alma',
  //   },
  // });

  // console.log({ todo });

  return NextResponse.json({ message: 'Seed executed' });
}
