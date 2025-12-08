'use client';

import Container from '@/components/Container';
import NoAccess from '@/components/NoAccess';
import { Address } from '@/sanity.types';
import useStore from '@/store';
import { useAuth, useUser } from '@clerk/nextjs';
import React, { useState } from 'react';

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
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null,
    );
    return (
        <div className="bg-gray-50 pb-52 md:pd-10 ">
            {isSignedIn ? (
                <Container>
                    <p>Cart Page</p>
                </Container>
            ) : (
                <NoAccess />
            )}
        </div>
    );
};

export default CartPage;
