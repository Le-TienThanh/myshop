import type { Metadata, Viewport } from 'next';
import '../globals.css';
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

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </ClerkProvider>
    );
}
