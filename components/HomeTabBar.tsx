import { productType } from '@/constants/data';
import Link from 'next/link';
import React from 'react';

interface Props {
    selectedTab: string;
    onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
    

    return (
        <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-5">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-hide pb-2 flex-1 min-w-0">
                {productType?.map((item) => (
                    <button
                        onClick={() => onTabSelect(item?.title)}
                        key={item?.title}
                        className={`border border-shop_light_green/20 whitespace-nowrap
                        px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green 
                        hover:border-shop_light_green hover:text-white hoverEffect flex-shrink-0
                        ${selectedTab === item?.title ? 'bg-shop_light_green text-white border-shop_light_green' : 'bg-shop_light_green/20'}`}
                    >
                        {item?.title}
                    </button>
                ))}
            </div>
            <Link
                href={'/shop'}
                className={`border border-shop_light_green/30 whitespace-nowrap
                        px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green 
                        hover:border-shop_light_green hover:text-white hoverEffect flex-shrink-0 text-xs sm:text-sm`}
            >
                See all
            </Link>
        </div>
    );
};

export default HomeTabBar;
