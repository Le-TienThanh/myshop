import { Product } from '@/sanity.types';
import useStore from '@/store';
import React from 'react';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Props {
    product: Product;
    className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
    const { addItem, removeItem, getItemCount } = useStore();
    const itemCount = getItemCount(product?._id);
    const isOutOfStock = product?.stock === 0;

    const handleRemoveProduct = () => {
        
        removeItem(product?._id);
        if (itemCount > 1) {
            toast.success('Quantity Decrease successfully!');
        } else {
            toast.success(
                `${product?.name?.substring(0, 12)} removed successfully!`,
            );
        }
    };

    const handleAddToCart = () => {
        if ((product?.stock as number) > itemCount) {
            addItem(product);
            toast.success('Quantity Increase successfully!');
        } else {
            toast.error('Can not add more than available stock');
        }
    };

    return (
        <div
            className={cn('flex items-center gap-0.5 sm:gap-1 text-base', className)}
        >
            <Button
                onClick={handleRemoveProduct}
                variant={'outline'}
                size={'icon'}
                disabled={itemCount === 0 || isOutOfStock}
                className="w-7 h-7 sm:w-8 sm:h-8 border-0 hover:bg-gray-300 hoverEffect flex-shrink-0 bg-gray-100"
            >
                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <span className="font-semibold text-sm sm:text-base w-8 sm:w-10 text-center text-darkColor">
                {itemCount}
            </span>
            <Button
                onClick={handleAddToCart}
                variant={'outline'}
                size={'icon'}
                disabled={isOutOfStock}
                className="w-7 h-7 sm:w-8 sm:h-8 border-0 hover:bg-gray-300 hoverEffect flex-shrink-0 bg-gray-100"
            >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
        </div>
    );
};

export default QuantityButtons;
