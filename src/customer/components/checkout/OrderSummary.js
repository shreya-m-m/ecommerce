import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import Cart from '../cart/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../state/Order/Action'
import CartItem from '../cart/CartItem'
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import { createPayment } from '../../../state/Payment/Action'
import { removeCartItem } from '../../../state/Cart/Action'
const OrderSummary = () => {
    const dispatch= useDispatch();
    const location=useLocation();
    const {order}=useSelector(store => store);
    const token = localStorage.getItem("token")
    const searchParams= new URLSearchParams(location.search);
    const orderId=searchParams.get("order_id")

    console.log("order_id",orderId)

    console.log("Orders ", order)
    useEffect(()=>{
        dispatch(getOrderById(orderId , token))
        console.log("disptaching data..",orderId)
    },[orderId])
    const handlePlaceOrder =() =>{
        dispatch(createPayment(orderId))
       

    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border'>
                <AddressCard address={order.order?.shippingAddress}/>
            </div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative mt-5'>
                <div className='col-span-2'>
                <div className='col-span-2'>
                {order.order?.orderItem?.map((item) => (
                    <CartItem item={item} />
                )) || <p>No items in the cart.</p>}
            </div>


                </div>
            <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border'>
                        <p className='font-bold opacity-60 pb-4'>PRICE DETAILS</p>
                        <hr />
                        <div className='space-y-3 font-semibold mb-10'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Total MRP</span>
                                <span>₹{order.order?.totalPrice}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Discount On MRP</span>
                                <span className='text-green-600'>-₹{order.order?.discount}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Delivery Charge</span>
                                <span className='text-green-600'>Free</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black font-bold'>
                                <span>Total Amount</span>
                                <span>₹{order.order?.totalDiscountedPrice}</span>
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
       


    )
}
export default OrderSummary