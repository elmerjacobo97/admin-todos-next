import Image from 'next/image';
import Link from 'next/link';
import { IoCalendarNumberOutline, IoBookmarkOutline, IoLogOutOutline, IoListOutline, IoCloudDoneOutline, IoCartOutline } from 'react-icons/io5';
import { SidebarItem } from './SidebarItem';

const menuItems = [
  { icon: <IoCalendarNumberOutline size={30} />, title: 'Dashboard', path: '/dashboard' },
  { icon: <IoBookmarkOutline size={30} />, title: 'Rest Todos', path: '/dashboard/rest-todos' },
  { icon: <IoListOutline size={30} />, title: 'Server Actions', path: '/dashboard/server-todos' },
  { icon: <IoCloudDoneOutline size={30} />, title: 'Cookies Tabs', path: '/dashboard/cookies' },
  { icon: <IoCartOutline size={30} />, title: 'Cookies Products', path: '/dashboard/products' },
];

export const Sidebar = () => {
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
          <Image
            src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
            width={100}
            height={100}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            alt=""
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Elmer Jacobo</h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          {menuItems.map((item) => (
            <SidebarItem key={item.title} icon={item.icon} title={item.title} path={item.path} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <IoLogOutOutline />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};
