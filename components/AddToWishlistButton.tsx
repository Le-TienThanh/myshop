'use client';
import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types';
import useStore from '@/store';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddToWishlistButton = ({
    product,
    className,
}: {
    product: Product;
    className?: string;
}) => {
    const { favoriteProduct, addToFavorite } = useStore();
    const [existingProduct, setExistingProduct] = useState<Product | null>(
        null,
    );
    useEffect(() => {
        const availableProduct = favoriteProduct?.find(
            (item) => item?._id === product?._id,
        );
        setExistingProduct(availableProduct || null);
    }, [product, favoriteProduct]);
    const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        if (product?._id) {
            addToFavorite(product).then(() => {
                toast.success(
                    existingProduct
                        ? 'Product removed successfully!'
                        : 'Product added successfully!',
                );
            });
        }
    };
    return (
        <div className={cn('absolute top-2 right-2 z-10', className)}>
            <button
                onClick={handleFavorite}
                className={`p-2.5 rounded-full hover:bg-shop_dark_green text-shop_light_green hover:text-white 
      hoverEffect bg-white ${existingProduct ? 'text-white' : ''}`}
            >
                <Heart fill={existingProduct ? '#f54336' : 'white'} size={15} />
            </button>
        </div>
    );
};

export default AddToWishlistButton;
