import Container from '@/components/Container';
import HomeBanner from '@/components/HomeBanner';
import HomeCategories from '@/components/HomeCategories';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/sanity/queries';
import React from 'react';

const Home = async () => {
    const categories = await getCategories(6);
    console.log('Categories on Home Page:', categories);
    return (
        <Container className="bg-shop-light-pink">
            <HomeBanner />
            <div className="py-10">
                <ProductGrid />
            </div>
            <HomeCategories />
        </Container>
    );
};

export default Home;
