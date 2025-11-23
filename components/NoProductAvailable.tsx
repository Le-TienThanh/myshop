'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const NoProductAvailable = ({
    selectedTab,
    className,
}: {
    selectedTab?: string;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                `flex flex-col items-center justify-center py-10 min-h-80 space-y-4 
                text-center bg-gray-100 rounded-lg w-full mt-10`,
                className,
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-gray-800">
                    No products available
                </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-600 "
            >
                We are sorry, but there are no products matching on{' '}
                <span>{selectedTab} </span> criteria at the moment.
            </motion.p>

            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center space-x-2 text-shop_light_green "
            >
                <Loader2 className="w-5 h-5 animate-spin-clockwise" />
                <span>We are restocking shortly</span>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm text-gray-500"
            >
                Please check back later or explore other categories.
            </motion.p>
        </div>
    );
};

export default NoProductAvailable;
