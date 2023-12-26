'use client';
import { usePathname } from 'next/navigation';

interface Props {
  icon: React.ReactNode;
  title: string;
  path: string;
}

export const SidebarItem = ({ icon, title, path }: Props) => {
  const pathName = usePathname();
  return (
    <li>
      <a
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 hover:bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white transition-colors ${
          pathName === path ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white' : ''
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </a>
    </li>
  );
};
