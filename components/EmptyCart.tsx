import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { emptyCart } from '@/images';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const EmptyCart = () => {
    return (
        <div
            className="py-10 md:py-20 bg-gradient-to-b from-shop_light_green to-white 
        flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8"
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="relative w-48 h-48 mx-auto"
                >
                    <Image
                        src={emptyCart}
                        alt="Empty shopping cart "
                        layout="fill"
                        objectFit="contain "
                        className="drop-shadow-lg "
                    />
                    <motion.div
                        animate={{ x: [0, 10, 10, 0], y: [0, 5, 5, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2 bg-shop_light_green"
                    >
                        <ShoppingCart className="text-white " size={24}  />
                    </motion.div>
                </motion.div>
                <div className='text-center space-y-4 '>
                    <h2 className='text-3xl font-bold text-gray-800'>
                        Your cart is feeling lonely!
                    </h2>
                    <p className='text-gray-600'>
                        It looks like you haven't added any products to your cart
                        yet. Start exploring our collection and find something
                        special to fill it up!
                    </p>

                </div>
                <div>
                    <Link href={'/'} className='block bg-shop_light_green border 
                    text-center py-2.5 rounded-full text-sm font-semibold tracking-wide text-white
                     hover:bg-shop_dark_green hover:text-white hoverEffect'>
                        Discover Products
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default EmptyCart;
