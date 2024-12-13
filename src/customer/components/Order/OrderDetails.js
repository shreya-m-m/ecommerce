import React, { useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';
import { Box, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOrderById } from '../../../state/Order/Action';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const token = localStorage.getItem("token");

    // Access order data from the redux store
    const { order } = useSelector(store => store);
    console.log("Orders", order)

    useEffect(() => {
        if (order && order.order_id) {
            dispatch(getOrderById(order.order_id, token));
        }
    }, [order?.order_id, dispatch, token]); // Ensure dependency on order_id

    // Guard clause for loading state or empty order data
    if (!order || !order.order_id) {
        return <div>Loading...</div>;
    }

    return (
        <div className='px:5 lg:px-20'>
            <div>
                <h1 className='font-bold text-xl py-6'>Delivery Address</h1>
                <AddressCard address={order?.shippingAddress} />
            </div>
            <div className='py-20'>
                <OrderTracker activeStep={3} />
            </div>
            <Grid className='space-y-5' container>
                {/* Replace the hardcoded array with actual order items if available */}
                {order.items?.map((item, index) => (
                    <Grid 
                        key={index}
                        item 
                        container 
                        className='shadow-xl rounded-md p-5 border' 
                        sx={{alignItems: "center", justifyContent: "space-between"}}
                    >
                        <Grid item xs={6}>
                            <div className='flex item-center space-x-4'>
                                <img 
                                    className="w-[7rem] h-[7rem] object-cover object-full" 
                                    src={item.imageUrl || "https://via.placeholder.com/150"} 
                                    alt={item.name} 
                                />
                                <div className='space-y-2'>
                                    <p className='font-semibold'>{item.name}</p>
                                    <p className='space-x-5 opacity-50 text-xs font-semibold'>
                                        <span>Colour: {item.color}</span>
                                        <span>Size: {item.size}</span>
                                    </p>
                                    <p className='opacity-50 text-xs'>Seller: {item.seller}</p>
                                    <p>₹{item.price}</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <Box sx={{ color: deepPurple[500] }}>
                                <StarBorderOutlinedIcon sx={{ fontSize: "2rem" }} className='px-2' />
                                <span>Ratings</span>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default OrderDetails;
