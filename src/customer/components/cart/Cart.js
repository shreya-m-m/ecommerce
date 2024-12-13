import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../state/Cart/Action';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store);
    const token= localStorage.getItem("token")
    // const location=useLocation();

    // const searchParams= new URLSearchParams(location.search);
    // const cartItemId=searchParams.get("cartItems_id")

    // console.log("Cart Item id",cartItemId)


    const handlePlaceOrder = () => {
        navigate("/checkout?step=2");
    };

    useEffect(() => {
        dispatch(getCart(token))
      
    },[cart.updateCartItem,cart.deleteCartItem,dispatch,token]);
    // console.log("cart:", cart);               
    // console.log("cart.cart:", cart.cart);     
    // console.log("cartItems array:", cart.cartItems); 





    return (
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative mt-5'>
             
                <div className='col-span-2'>
                {cart.cart?.cartItem.map((item) => (
                    <CartItem item={item} />
                )) || <p>No items in the cart.</p>}
            </div>


                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border'>
                        <p className='font-bold opacity-60 pb-4'>PRICE DETAILS</p>
                        <hr />
                        <div className='space-y-3 font-semibold mb-10'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Total MRP</span>
                                <span>₹{cart.cart?.totalPrice}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Discount On MRP</span>
                                <span className='text-green-600'>-₹{cart.cart?.discount}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Delivery Charge</span>
                                <span className='text-green-600'>Free</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black font-bold'>
                                <span>Total Amount</span>
                                <span>₹{cart.cart?.totalDiscountedPrice}</span>
                            </div>
                        </div>
                        <Button
                            onClick={handlePlaceOrder}
                            variant="contained"
                            aria-label="Place Order"
                            className="w-full mt-5"
                            sx={{ backgroundColor: '#E52B50' }}
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
