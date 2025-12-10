'use client';
import useStore from '@/store';
import React, { useState } from 'react';
import Container from './Container';
import { HeartIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const WishListProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(7);
    const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
    const loadMore = () => {
        setVisibleProducts((prev) =>
            Math.min(prev + 5, favoriteProduct?.length),
        );
    };

    return (
        <Container>
            {favoriteProduct?.length > 0 ? (
                <p>Product available</p>
            ) : (
                <div
                    className="flex min-h-[400px] flex-col items-center justify-center space-y-6
                px-4 text-center"
                >
                    <div className="relative mb-4">
                        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-muted-foreground animate-scale" />
                        <HeartIcon
                            className="h-12 w-12 text-muted-foreground"
                            strokeWidth={1.5}
                        />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Your wishlist is empty
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Items added to your wishlist will appear here.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={'/shop'}>Continue Shopping</Link>
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default WishListProducts;
