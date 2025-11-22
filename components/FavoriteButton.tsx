import { Product } from '@/sanity.types';
import { Heart, Pointer } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const FavoriteButton = ({
    showProduct = false,
    product,
}: {
    showProduct?: boolean;
    product?: Product | null | undefined;
}) => {
    return (
        <>
            {!showProduct ? (
                <Link href={'/wishlist'} className="group relative ">
                    <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
                    <span
                        className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full 
                    text-xs font-semibold flex items-center justify-center"
                    >
                        0
                    </span>
                </Link>
            ) : (
                <button className="group">
                    <Heart
                        fill="#f54336"
                        className=" text-[#f54336]  group-hover:scale-150
                        mt-0.5 w-5 h-5 "
                    />
                </button>
            )}
        </>
    );
};

export default FavoriteButton;
