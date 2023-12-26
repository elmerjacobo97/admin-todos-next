// shortcut - prc
import { WidgetItem } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function DashboardPage() {
  // Leer datos de autenticación, ya sea de github o de google
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  // console.log('Session: ', session);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <WidgetItem title="Usuario conectado - Server Side">
        <div className="flex flex-col space-y-2">
          <Image src={session?.user?.image ?? ''} width={100} height={100} className="w-20 h-20 m-auto rounded-full object-cover" alt="profile" />
          <p className="text-center font-black text-xl text-blue-600">{session?.user?.email}</p>
          <p className="text-center font-black text-xl text-blue-600">{session?.user?.name}</p>
          {/* <div>{JSON.stringify(session)}</div> */}
        </div>
      </WidgetItem>
    </div>
  );
}
