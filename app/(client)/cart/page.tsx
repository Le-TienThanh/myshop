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
                            <div className="grid lg:grid-cols-3 md:gap-8">
                                <div className="lg:col-span-2 rounded-lg">
                                    <div className="border  rounded-md bg-white">
                                        {groupedItems?.map(({ product }) => {
                                            const itemCount = getItemCount(
                                                product?._id,
                                            );
                                            return (
                                                <div
                                                    key={product?._id}
                                                    className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                                                >
                                                    <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                                                        {product?.images && (
                                                            <Link
                                                                href={`/product/${product?.slug?.current}`}
                                                                className="border p-0.5 md:p-1 mr-2 rounded-md
                                 overflow-hidden group"
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
                                                                    className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                                                />
                                                            </Link>
                                                        )}
                                                        <div className="h-full flex flex-1 flex-col justify-between py-1">
                                                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                                                                <h2 className="text-base font-semibold line-clamp-1">
                                                                    {
                                                                        product?.name
                                                                    }
                                                                </h2>
                                                                <p className="text-sm capitalize">
                                                                    Variant:{' '}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            product?.variant
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="text-sm capitalize">
                                                                    Status:{' '}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            product?.status
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
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
                                                                                className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
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
                                                    <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                                                        <PriceFormatter
                                                            amount={
                                                                (product?.price as number) *
                                                                itemCount
                                                            }
                                                            className="font-bold text-lg"
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
                                        className="m-5 font-semibold"
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
