import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sigInEmailWithPassword } from '@/auth/actions/auth-actions';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // email and password
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password', placeholder: '********' },
      },
      async authorize(credentials, req) {
        const user = sigInEmailWithPassword(credentials!.email, credentials!.password);

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user });
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // console.log({ token });
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? 'no-email',
        },
      });

      // No dejar entrar si el user está inactivo
      if (dbUser?.isActive === false) {
        throw new Error('User is not active, please contact admin');
      }

      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';

      return token;
    },
    async session({ session, token, user }) {
      // console.log({ token });

      if (session && session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
