'use client';

import Container from './Container';
import Logo from './Logo';
import HeaderMenu from './HeaderMenu';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import FavoriteButton from './FavoriteButton';
import MobileMenu from './MobileMenu';
import SignIn from './SignIn';
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Logs } from 'lucide-react';

const HeaderClient = ({ ordersCount }: { ordersCount: number }) => {
  return (
    <header className="bg-white py-5 sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MobileMenu />
          <Logo />
        </div>

        <HeaderMenu />

        <div className="flex items-center gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />

          <SignedIn>
            <Link href="/orders" className="relative">
              <Logs />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full px-1">
                {ordersCount}
              </span>
            </Link>
          </SignedIn>

          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignIn />
            </SignedOut>
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default HeaderClient;
