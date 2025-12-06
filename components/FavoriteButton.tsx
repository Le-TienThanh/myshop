// 'use client';
// import { Product } from '@/sanity.types';
// import useStore from '@/store';
// import { Heart, Pointer } from 'lucide-react';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

// const FavoriteButton = ({
//     showProduct = false,
//     product,
// }: {
//     showProduct?: boolean;
//     product?: Product | null | undefined;
// }) => {
//     const { favoriteProduct, addToFavorite } = useStore();
//     const [existingProduct, setExistingProduct] = useState<Product | null>(
//         null,
//     );

//     useEffect(() => {
//         const availableItem = favoriteProduct?.find(
//             (item) => item?._id === product?._id,
//         );
//         setExistingProduct(availableItem || null);
//     }, [product, favoriteProduct]);

//     const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
//         e.preventDefault();
//         if (product?._id) {
//             addToFavorite(product).then(() => {
//                 toast.success(
//                     existingProduct
//                         ? 'Product removed successfully!'
//                         : 'Product added successfully!',
//                 );
//             });
//         }
//     };

//     return (
//         <>
//             {!showProduct ? (
//                 <Link href={'/wishlist'} className="group relative ">
//                     <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
//                     <span
//                         className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full
//                     text-xs font-semibold flex items-center justify-center"
//                     >
//                         {favoriteProduct?.length ? favoriteProduct.length : 0}
//                     </span>
//                 </Link>
//             ) : (
//                 <button onClick={handleFavorite} className="group">
//                     <Heart
//                         fill="#f54336"
//                         className=" text-[#f54336]  group-hover:scale-150
//                         mt-0.5 w-5 h-5 "
//                     />
//                 </button>
//             )}
//         </>
//     );
// };

// export default FavoriteButton;
'use client';
import { Product } from '@/sanity.types';
import useStore from '@/store';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const FavoriteButton = ({
    showProduct = false,
    product,
}: {
    showProduct?: boolean;
    product?: Product | null | undefined;
}) => {
    const { favoriteProduct, addToFavorite } = useStore();
    const [existingProduct, setExistingProduct] = useState<Product | null>(
        null
    );
    useEffect(() => {
        const availableItem = favoriteProduct.find(
            (item) => item?._id === product?._id,
        );
        setExistingProduct(availableItem || null);
    }, [product, favoriteProduct]);

    const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (product?._id) {
            addToFavorite(product).then(() => {
                toast.success(
                    `${existingProduct ? 'Product removed successfully!' : 'Product added successfully!'}`,
                );
            });
        }
    };
    return (
        <>
            {!showProduct ? (
                <Link href={'/wishlist'} className="group relative">
                    <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
                    <span
                        className="absolute -top-1 -right-1 bg-shop_dark_green text-white
                     h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center"
                    >
                        {favoriteProduct?.length ? favoriteProduct?.length : 0}
                    </span>
                </Link>
            ) : (
                <button
                    onClick={handleFavorite}
                    className="group relative hover:text-shop_light_green hoverEffect border 
                    border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm"
                >
                    {existingProduct ? (
                        <Heart
                            fill="#f54336"
                            className="text-heart group-hover:text-shop_light_green 
                            hoverEffect mt-.5 w-5 h-5"
                        />
                    ) : (
                        <Heart
                            className="text-shop_light_green group-hover:text-shop_light_green 
                        hoverEffect mt-.5 w-5 h-5"
                        />
                    )}
                </button>
            )}
        </>
    );
};

export default FavoriteButton;
