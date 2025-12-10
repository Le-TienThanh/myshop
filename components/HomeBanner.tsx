'use client';
import React from 'react';
import { Title } from './ui/text';
import Link from 'next/link';
import Image from 'next/image';
import { banner_1 } from '@/images';
import { motion } from 'framer-motion';

const HomeBanner = () => {
    return (
        <div className="py-8 md:py-16 lg:py-0 bg-shop_light_pink rounded-lg px-4 sm:px-6 md:px-10 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 overflow-hidden">
            <div className="space-y-4 md:space-y-5 w-full md:w-auto">
                <Title>
                    Grab Upto 50% off on <br />
                    Selected headphone
                </Title>
                <div>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        
                    >
                        <Link
                            href={'/shop'}
                            className={`bg-shop_light_green text-white px-5 py-2 
                rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_green hoverEffect animate-scale inline-block`}
                        >
                            Buy Now
                        </Link>
                    </motion.div>
                </div>
            </div>
            <div className="hidden md:block">
                <Image
                    src={banner_1}
                    alt="banner_1"
                    className="hidden md:inline-flex w-96"
                />
            </div>
        </div>
    );
};

export default HomeBanner;
