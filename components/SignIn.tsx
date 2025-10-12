// import { SignInButton } from '@clerk/nextjs';
// import React from 'react';

// const SignIn = () => {
//     return (
//         <SignInButton mode="modal" >
//             <button className="text-sm font-semibold hover:text-shop_light_green text-darkColor hover:cursor-pointer hoverEffect">
//                 Login
//             </button>
//         </SignInButton>
//     );
// };

// export default SignIn;
'use client';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import React from 'react';

const SignIn = () => {
    const { isSignedIn } = useUser();

    return (
        <div>
            {!isSignedIn ? (
                <SignInButton mode="modal">
                    <button className="text-sm font-semibold hover:text-shop_light_green text-darkColor hover:cursor-pointer hoverEffect">
                        Login
                    </button>
                </SignInButton>
            ) : (
                <UserButton afterSignOutUrl="/" />
            )}
        </div>
    );
};

export default SignIn;
