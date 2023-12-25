'use client';

import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie('selectedTab', tab.toString(), {});
    router.refresh();
  };

  return (
    <div className={`flex justify-between  w-full space-x-4 rounded-full bg-gray-200 p-2 ${'grid-cols-' + tabOptions.length}`}>
      {tabOptions.map((tab) => (
        <div key={tab} className="w-full">
          <input checked={selected === tab} onChange={() => {}} type="radio" id={tab.toString()} className="peer hidden" />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition-all duration-300 ease-in-out block cursor-pointer select-none rounded-full p-2 text-center hover:bg-blue-500 hover:text-white hover:font-bold peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
