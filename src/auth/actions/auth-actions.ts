import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const sigInEmailWithPassword = async (email: string, password: string) => {
  if (!email || !password) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    // Crear el usuario
    return await createUser(email, password);
  }

  if (!bcrypt.compare(password, user.password ?? '')) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
      name: email.split('@')[0],
    },
  });

  return user;
};
