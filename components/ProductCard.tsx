import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { Flame } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div
            className="text-sm border-[1px] border-dark_blue/20 rounded-md 
        bg-white group"
        >
            <div className="relative group overflow-hidden bg-shop_light_bg">
                {product?.images && (
                    <Image
                        src={urlFor(product?.images[0]).url()}
                        alt="ProductImage"
                        loading="lazy"
                        width={700}
                        height={700}
                    />
                )}
                {product?.status === 'sale' && (
                    <p
                        className="absolute top-2 left-2 z-10
                    text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green 
                    hoverEffect group-hover:text-shop_light_green"
                    >
                        Sale!
                    </p>
                )}
                 {product?.status === 'new' && (
                    <p
                        className="absolute top-2 left-2 z-10
                    text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green 
                    hoverEffect group-hover:text-shop_light_green"
                    >
                        New!
                    </p>
                )}
                {product?.status === "hot" && <Link href={"/deal"} className='absolute top-2 left-2 z-10 border
                border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green
                hoverEffect'>
                    <Flame size={18} fill='#fb6c08' className='text-shop_orange/50 group-hover:text-shop_orange hoverEffect'/>
                </Link>}
            </div>
            <div className="p-3">Product details</div>
        </div>
    );
};

export default ProductCard;
