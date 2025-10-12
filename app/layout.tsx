import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
    title: {
        template: 'MyShop',
        default: 'MyShop',
    },
    description: 'An e-commerce website built with Next.js and Tailwind CSS',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="font-poppins antialiased">
                    <Header />

                    {children}
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
