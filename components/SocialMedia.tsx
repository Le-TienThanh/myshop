import { Facebook, Github, Youtube } from 'lucide-react';
import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import Link from 'next/link';
import { cn } from '@/lib/utils';
interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}
const socialLink = [
    {
        title: 'Youtube',
        href: 'https://www.youtube.com/@codebucks',
        icon: <Youtube className="h-5 w-5" />,
    },
    {
        title: 'Github',
        href: 'https://www.youtube.com/@codebucks',
        icon: <Github className="h-5 w-5" />,
    },
    {
        title: 'Facebook',
        href: 'https://www.youtube.com/@codebucks',
        icon: <Facebook className="h-5 w-5" />,
    },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
    return (
        <TooltipProvider>
            <div className={cn('flex items-center gap-3.5', className)}>
                {socialLink?.map((item) => {
                    return (
                        <Tooltip key={item?.title}>
                            <TooltipTrigger asChild>
                                <Link
                                    key={item?.title}
                                    href={item?.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect',
                                        iconClassName,
                                    )}
                                >
                                    {item?.icon}
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent
                                className={cn(
                                    'bg-white text-darkColor font-semibold ',
                                    tooltipClassName,
                                )}
                            >
                                {item?.title}
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
};

export default SocialMedia;
