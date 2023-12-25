import { cookies } from 'next/headers';
import { TabBar } from '@/components';

export const metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page description',
};

export default function CookiesPage() {
  const cookieStore = cookies();
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';

  // const allCookies = cookieStore.getAll();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <TabBar currentTab={+cookieTab} />
    </div>
  );
}
