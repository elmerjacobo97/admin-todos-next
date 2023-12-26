'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import { IoAtCircleOutline, IoLogInOutline, IoLogOutOutline } from 'react-icons/io5';

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoAtCircleOutline />
        <span className="group-hover:text-gray-700">Loading...</span>
      </button>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <button type="button" onClick={() => signIn()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoLogInOutline />
        <span className="group-hover:text-gray-700">Ingresar</span>
      </button>
    );
  }

  return (
    <button type="button" onClick={() => signOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
      <IoLogOutOutline />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
};
