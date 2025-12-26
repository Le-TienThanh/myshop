import { auth } from '@clerk/nextjs/server';
import { getMyOrders } from '@/sanity/queries';
import HeaderClient from './HeaderClient';

const Header = async () => {
    const { userId } = await auth();
    const orders = userId ? await getMyOrders(userId) : [];

    return <HeaderClient ordersCount={orders.length} />;
};

export default Header;
