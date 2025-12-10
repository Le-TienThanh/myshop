import { cn } from '@/lib/utils';
import React from 'react';

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn('max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6', className)}>
            {children}
        </div>
    );
};

export default Container;
