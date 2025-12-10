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
                                                    className="border-b p-3 sm:p-4 md:p-5 last:border-b-0"
                                                >
                                                    <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-stretch">
                                                        {/* Product Image */}
                                                        {product?.images && (
                                                            <Link
                                                                href={`/product/${product?.slug?.current}`}
                                                                className="border p-0.5 md:p-1 rounded-md overflow-hidden group flex-shrink-0"
                                                            >
                                                                <Image
                                                                    src={urlFor(
                                                                        product?.images[0],
                                                                    ).url()}
                                                                    alt="productImage"
                                                                    width={500}
                                                                    height={500}
                                                                    loading="lazy"
                                                                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover group-hover:scale-105 hoverEffect"
                                                                />
                                                            </Link>
                                                        )}
                                                        
                                                        {/* Product Details and Actions */}
                                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex-1 min-w-0 pr-4">
                                                                    <h2 className="text-sm sm:text-base lg:text-lg font-semibold break-words line-clamp-2 mb-1 sm:mb-1.5">
                                                                        {product?.name}
                                                                    </h2>
                                                                    <p className="text-xs sm:text-sm capitalize text-gray-600">
                                                                        Variant:{' '}
                                                                        <span className="font-semibold text-darkColor">
                                                                            {product?.variant}
                                                                        </span>
                                                                    </p>
                                                                    <p className="text-xs sm:text-sm capitalize text-gray-600">
                                                                        Status:{' '}
                                                                        <span className="font-semibold text-darkColor">
                                                                            {product?.status}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                {/* Price in top-right */}
                                                                <div className="flex-shrink-0">
                                                                    <PriceFormatter
                                                                        amount={
                                                                            (product?.price as number) *
                                                                            itemCount
                                                                        }
                                                                        className="font-bold text-base sm:text-lg lg:text-xl text-shop_dark_green"
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Action Icons and Quantity - aligned to bottom with image */}
                                                            <div className="flex items-center justify-between gap-2 sm:gap-3">
                                                                <div className="flex items-center gap-0.5 sm:gap-1">
                                                                    <div className="flex items-center justify-center h-8 w-8 [&>div>div]:p-1.5">
                                                                        <AddToWishlistButton
                                                                            product={product}
                                                                            className="relative top-0 right-0"
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center justify-center h-8 w-8">
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
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <QuantityButtons
                                                                        product={product}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className="border-t">
                                            <Button
                                                onClick={handleResetCart}
                                                className="m-3 sm:m-4 md:m-5 font-semibold w-auto"
                                                variant={'destructive'}
                                            >
                                                Reset Cart
                                            </Button>
                                        </div>
                                    </div>
                                    {/* Order Summary for Mobile */}
                                    <div className="md:hidden mt-4 space-y-4">
                                        <div className="w-full bg-white p-4 rounded-lg border">
                                            <h2 className="text-lg font-bold mb-3">Order Summary</h2>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">SubTotal</span>
                                                    <PriceFormatter
                                                        amount={getSubTotalPrice()}
                                                        className="font-semibold"
                                                    />
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Discount</span>
                                                    <span className="font-semibold text-green-600">
                                                        -<PriceFormatter
                                                            amount={getSubTotalPrice() - getTotalPrice()}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="border-t pt-2 flex justify-between">
                                                    <span className="font-bold">Total</span>
                                                    <PriceFormatter
                                                        amount={getTotalPrice()}
                                                        className="font-bold text-shop_dark_green"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                className="w-full mt-3 bg-shop_dark_green hover:bg-shop_light_green text-white font-semibold"
                                            >
                                                Proceed to Checkout
                                            </Button>
                                        </div>
                                        <div className="w-full bg-white p-4 rounded-lg border">
                                            <h2 className="text-lg font-bold mb-3">Delivery Address</h2>
                                            <div className="space-y-2">
                                                {user?.emailAddresses?.[0]?.emailAddress && (
                                                    <div className="flex items-start gap-2">
                                                        <input
                                                            type="radio"
                                                            name="address-mobile"
                                                            id="address-mobile-1"
                                                            className="mt-1"
                                                            checked={selectedAddress === null}
                                                            onChange={() => setSelectedAddress(null)}
                                                        />
                                                        <label htmlFor="address-mobile-1" className="text-sm cursor-pointer">
                                                            <span className="font-semibold">{user.emailAddresses[0].emailAddress}</span>
                                                            <br />
                                                            <span className="text-gray-600">Default address</span>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Order Summary for Desktop */}
                                <div className="lg:col-span-1">
                                    <div className="hidden md:block space-y-6">
                                        <div className="w-full bg-white p-6 rounded-lg border">
                                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">SubTotal</span>
                                                    <PriceFormatter
                                                        amount={getSubTotalPrice()}
                                                        className="font-semibold"
                                                    />
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Discount</span>
                                                    <span className="font-semibold text-green-600">
                                                        -<PriceFormatter
                                                            amount={getSubTotalPrice() - getTotalPrice()}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="border-t pt-3 flex justify-between">
                                                    <span className="font-bold text-lg">Total</span>
                                                    <PriceFormatter
                                                        amount={getTotalPrice()}
                                                        className="font-bold text-lg text-shop_dark_green"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                className="w-full mt-4 bg-shop_dark_green hover:bg-shop_light_green text-white font-semibold"
                                            >
                                                Proceed to Checkout
                                            </Button>
                                        </div>
                                        <div className="w-full bg-white p-6 rounded-lg border">
                                            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                                            <div className="space-y-3">
                                                {user?.emailAddresses?.[0]?.emailAddress && (
                                                    <div className="flex items-start gap-2">
                                                        <input
                                                            type="radio"
                                                            name="address"
                                                            id="address-1"
                                                            className="mt-1"
                                                            checked={selectedAddress === null}
                                                            onChange={() => setSelectedAddress(null)}
                                                        />
                                                        <label htmlFor="address-1" className="text-sm cursor-pointer">
                                                            <span className="font-semibold">{user.emailAddresses[0].emailAddress}</span>
                                                            <br />
                                                            <span className="text-gray-600">Default address</span>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
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
