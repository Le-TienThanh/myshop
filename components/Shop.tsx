'use client';
import { BRANDS_QUERYResult, Category, Product } from '@/sanity.types';
import React, { useState } from 'react';
import Container from './Container';
import Title from './Title';
import CategoryList from './shop/CategoryList';
import BrandList from './shop/BrandList';
import PriceList from './shop/PriceList';
import { useSearchParams } from 'next/navigation';

interface Props {
    categories: Category[];
    brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
    const searchParams = useSearchParams();
    const brandParams = searchParams?.get('brand');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        brandParams || null,
    );
    const [selectedBrand, setSelectedBrand] = useState<string | null>(
        brandParams || null,
    );
    const [selectedPrice, setSelectedPrice] = useState<string | null>(
        brandParams || null,
    );

    return (
        <div className="border-t">
            <Container className="mt-5">
                <div className="sticky top-0 z-10 mb-5">
                    <div className="flex items-center justify-between">
                        <Title className="text-lg uppercase tracking-wide ">
                            Get the products as your needs
                        </Title>
                        <button className="text-black underline text-sm mt-2 font-medium hoverEffect hover:text-shop_light_green">
                            Reset Filters
                        </button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_light_green">
                    <div
                        className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-hidden md:min-w-64
                     pb-5 md:border-r border-r-shop_light_green"
                    >
                        <CategoryList
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                        <BrandList />
                        <PriceList />
                    </div>
                    <div>Products</div>
                </div>
            </Container>
        </div>
    );
};

export default Shop;
