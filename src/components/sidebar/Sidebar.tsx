import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { IoCalendarNumberOutline, IoBookmarkOutline, IoListOutline, IoCloudDoneOutline, IoCartOutline, IoPersonOutline } from 'react-icons/io5';
import { SidebarItem } from './SidebarItem';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { LogoutButton } from '..';

const menuItems = [
  { icon: <IoCalendarNumberOutline size={30} />, title: 'Dashboard', path: '/dashboard' },
  { icon: <IoBookmarkOutline size={30} />, title: 'Rest Todos', path: '/dashboard/rest-todos' },
  { icon: <IoListOutline size={30} />, title: 'Server Actions', path: '/dashboard/server-todos' },
  { icon: <IoCloudDoneOutline size={30} />, title: 'Cookies Tabs', path: '/dashboard/cookies' },
  { icon: <IoCartOutline size={30} />, title: 'Cookies Products', path: '/dashboard/products' },
  { icon: <IoPersonOutline size={30} />, title: 'Profile', path: '/dashboard/profile' },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const userName = session?.user?.name ?? 'No name';
  const avatarUrl = session?.user?.image ? session.user.image : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';
  const userRoles = session.user?.roles ?? ['client'];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="#" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              width={100}
              height={100}
              className="w-32"
              alt="tailus logo"
            />
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Image src={avatarUrl} width={100} height={100} className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" alt="" />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(' | ')}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          {menuItems.map((item) => (
            <SidebarItem key={item.title} icon={item.icon} title={item.title} path={item.path} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
