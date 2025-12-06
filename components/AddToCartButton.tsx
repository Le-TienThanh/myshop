'use client';
import { Product } from '@/sanity.types';
import React from 'react';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import useStore from '@/store';
import toast from 'react-hot-toast';
import PriceFormatter from './PriceFormatter';
import QuantityButtons from './QuantityButtons';

interface Props {
    product: Product | any;
    className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
    const { addItem, getItemCount } = useStore();
    const itemCount = getItemCount(product?._id);
    const isOutOfStock = product?.stock === 0;
    const handleAddToCart = () => {
        if ((product?.stock as number) > itemCount) {
            addItem(product);
            toast.success(
                `${product?.name?.substring(0, 12)}... added successfully!`,
            );
        } else {
            toast.error('Can not add more than available stock!');
        }
    };
    return (
        <div className="w-full h-12 flex items-center">
            {itemCount ? (
                <div className="text-sm w-full">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-darkColor">Quantity</span>
                        <QuantityButtons product={product} />
                    </div>
                    <div className="flex items-center justify-between border-t pt-1">
                        <span className="text-xs font-semibold">Subtotal</span>{' '}
                        <PriceFormatter
                            amount={
                                product?.price ? product?.price * itemCount : 0
                            }
                        />
                    </div>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default AddToCartButton;
