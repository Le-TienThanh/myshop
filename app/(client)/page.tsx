import Container from '@/components/Container';
import HomeBanner from '@/components/HomeBanner';
import { Button } from '@/components/ui/button';
import React from 'react';

const Home = () => {
    return (
        <Container className="bg-shop-light-pink">
            <HomeBanner />
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam sequi ab voluptates nostrum blanditiis harum explicabo
                ut quidem nulla ratione.
            </div>
        </Container>
    );
};

export default Home;
