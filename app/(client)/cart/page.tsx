'use client';

import AddToWishlistButton from '@/components/AddToWishlistButton';
import Container from '@/components/Container';
import EmptyCart from '@/components/EmptyCart';
import NoAccess from '@/components/NoAccess';
import PriceFormatter from '@/components/PriceFormatter';
import QuantityButtons from '@/components/QuantityButtons';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Address } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import useStore from '@/store';
import { useAuth, useUser } from '@clerk/nextjs';
import { ShoppingBag, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CartPage = () => {
    const {
        deleteCartProduct,
        getTotalPrice,
        getItemCount,
        getSubTotalPrice,
        resetCart,
    } = useStore();
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const groupedItems = useStore((state) => state?.getGroupedItems());
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null,
    );
    const handleResetCart = () => {
        const confirmed = window.confirm(
            'Are you sure you want to reset the cart?',
        );
        if (confirmed) {
            resetCart();
            toast.success('Cart has been reset.');
        }
    };
    return (
        <div className="bg-gray-50 pb-5 md:pd-10 ">
            {isSignedIn ? (
                <Container>
                    {groupedItems?.length > 0 ? (
                        <>
                            <div className="flex items-center gap-2 py-5">
                                <ShoppingBag className="text-shop_light_green" />
                                <Title>Shopping Cart</Title>
                            </div>
                            <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                <div className="lg:col-span-2 rounded-lg">
                                    <div className="border rounded-md bg-white overflow-hidden">
                                        {groupedItems?.map(({ product }) => {
                                            const itemCount = getItemCount(
                                                product?._id,
                                            );
                                            return (
                                                <div
                                                    key={product?._id}
                                                    className="border-b p-3 sm:p-4 md:p-5 last:border-b-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-5"
                                                >
                                                    <div className="flex flex-1 items-start gap-2 sm:gap-3 min-w-0 w-full sm:w-auto">
                                                        {product?.images && (
                                                            <Link
                                                                href={`/product/${product?.slug?.current}`}
                                                                className="border p-0.5 md:p-1 rounded-md overflow-hidden group flex-shrink-0"
                                                            >
                                                                <Image
                                                                    src={urlFor(
                                                                        product
                                                                            ?.images[0],
                                                                    ).url()}
                                                                    alt="productImage"
                                                                    width={500}
                                                                    height={500}
                                                                    loading="lazy"
                                                                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover group-hover:scale-105 hoverEffect"
                                                                />
                                                            </Link>
                                                        )}
                                                        <div className="flex flex-1 flex-col justify-between gap-2 sm:gap-3 min-w-0">
                                                            <div className="flex flex-col gap-1 sm:gap-1.5">
                                                                <h2 className="text-sm sm:text-base font-semibold break-words line-clamp-2">
                                                                    {
                                                                        product?.name
                                                                    }
                                                                </h2>
                                                                <p className="text-xs sm:text-sm capitalize text-gray-600">
                                                                    Variant:{' '}
                                                                    <span className="font-semibold text-darkColor">
                                                                        {
                                                                            product?.variant
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="text-xs sm:text-sm capitalize text-gray-600">
                                                                    Status:{' '}
                                                                    <span className="font-semibold text-darkColor">
                                                                        {
                                                                            product?.status
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2 sm:gap-3">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <AddToWishlistButton
                                                                                product={
                                                                                    product
                                                                                }
                                                                                className="relative top-0 right-0"
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="font-bold">
                                                                            Add
                                                                            to
                                                                            Favorite
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Trash
                                                                                onClick={() => {
                                                                                    deleteCartProduct(
                                                                                        product?._id,
                                                                                    );
                                                                                    toast.success(
                                                                                        'Product deleted successfully!',
                                                                                    );
                                                                                }}
                                                                                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-red-600 hoverEffect cursor-pointer"
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="font-bold bg-red-600">
                                                                            Delete
                                                                            product
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 sm:gap-4 w-full sm:w-auto sm:flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0">
                                                        <PriceFormatter
                                                            amount={
                                                                (product?.price as number) *
                                                                itemCount
                                                            }
                                                            className="font-bold text-base sm:text-lg text-shop_dark_green"
                                                        />
                                                        <QuantityButtons
                                                            product={product}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <Button
                                        onClick={handleResetCart}
                                        className="m-3 sm:m-4 md:m-5 font-semibold w-auto"
                                        variant={'destructive'}
                                    >
                                        Reset Cart
                                    </Button>
                                </div>
                                <div>
                                    <div className="lg:col-span-1">
                                        <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                                            <h2>Order Summary</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <EmptyCart />
                    )}
                </Container>
            ) : (
                <NoAccess />
            )}
        </div>
    );
};

export default CartPage;
