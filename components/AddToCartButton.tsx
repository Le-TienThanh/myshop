'use client';
import { Product } from '@/sanity.types';
import React from 'react';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    product: Product | null | undefined;
    className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
    const isOutOfStock = product?.stock === 0;
    const handleAddToCart = () => {
        window.alert(`Added ${product?.name} to cart!`);
        // tao thong bao chuyen nghiep hon sau
    };
    return (
        <div>
            <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={cn(
                    `w-full bg-shop_light_green text-white shadow-none
            border border-shop_dark_green/80 font-semibold tracking-wide hover:text-while
            hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect`,
                    className,
                )}
            >
                <ShoppingBag />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
        </div>
    );
};

export default AddToCartButton;
