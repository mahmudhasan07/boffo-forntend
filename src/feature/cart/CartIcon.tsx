import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from './CartSlice';
import { RootState } from '@/redux/store';

const CartIcon = () => {
    const dispatch = useDispatch();
    const { isOpen, cart } = useSelector((state: RootState) => state.cart);
    console.log(isOpen);
    return (
        <div>
            <button onClick={() => { dispatch(toggleDrawer()); console.log("clicked"); }} className='relative mx-auto my-auto'>
                <ShoppingCart className="h-6 w-6 hover:cursor-pointer" />
                <p className='text-white bg-primary rounded-full w-5 text-sm flex items-center justify-center h-5 absolute -top-2 -right-3'>{cart.length}</p>
            </button>
        </div>
    );
};

export default CartIcon;