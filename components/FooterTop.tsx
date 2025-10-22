import { Clock, Contact, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

interface ContactItemData {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}
const data: ContactItemData[] = [
    {
        title: 'Visit Us',
        subtitle: 'HUST',
        icon: (
            <MapPin className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
        ),
    },
    {
        title: 'Call Us',
        subtitle: '0123456789 ',
        icon: (
            <Phone className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
        ),
    },
    {
        title: 'Working Hours',
        subtitle: 'Mon - Sat: 10:00 AM - 8:00 PM',
        icon: (
            <Clock className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
        ),
    },
    {
        title: 'Email Us',
        subtitle: 'letienthanhthptbs@gmail.com',
        icon: (
            <Mail className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
        ),
    },
];

const FooterTop = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
            {data?.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 group hover:bg-gray-300 
                 p-4
                transition-colors hoverEffect "
                >
                    {item?.icon}
                    <div>
                        <h3
                            className="font-semibold text-gray-900 group-hover:text-black hoverEffect
                        "
                        >
                            {item?.title}
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm group-hover:text-gray-900 hoverEffect ">
                            {item?.subtitle}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FooterTop;
