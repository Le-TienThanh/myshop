'use client';
import { Category } from '@/sanity.types';
import React from 'react';
import Title from '../Title';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface Props {
    categories: Category[];
    selectedCategory?: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}: Props) => {
    return (
        <div className="w-full p-5 bg-white">
            <Title className="text-base font-black">Product Categories</Title>
            <RadioGroup value={selectedCategory || ''} className="mt-2">
                {categories?.map((category) => (
                    <div
                        onClick={() => {
                            setSelectedCategory(
                                category?.slug?.current as string,
                            );
                        }}
                        key={category?._id}
                        className="flex items-center space-x-2 hover:cursor-pointer"
                    >
                        <RadioGroupItem
                            value={category?.slug?.current as string}
                            id={category?.slug?.current}
                            className=" "
                        />
                        <Label
                            htmlFor={category?.slug?.current}
                            className={`${
                                selectedCategory === category?.slug?.current
                                    ? 'font-semibold text-shop_light_green '
                                    : 'font-normal'
                            }`}
                        >
                            {category?.title}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default CategoryList;
