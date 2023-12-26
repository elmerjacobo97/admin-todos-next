'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
      {session?.user?.image && (
        <div className="w-32 h-32 relative">
          <Image src={session.user.image} alt="Profile Image" layout="fill" className="rounded-full" />
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-800">Profile Details</h2>
      <p className="text-lg text-gray-700">
        <span className="font-bold">Name:</span> {session?.user?.name || 'Not Available'}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-bold">Email:</span> {session?.user?.email || 'Not Available'}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-bold">Roles:</span> {session?.user?.roles?.join(', ') || 'Not Available'}
      </p>
    </div>
  );
}

{
  /* <p className="text-center">Name: {session?.user?.name}</p>
      <p className="text-center">Email: {session?.user?.email}</p>
      <p className="text-center">Imagen: {session?.user?.image}</p>
      <p className="text-center">Roles: {session?.user?.roles}</p> */
}
