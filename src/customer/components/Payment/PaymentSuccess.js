import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../../state/Order/Action';
import { updatePayment } from '../../../state/Payment/Action';
import { Alert, AlertTitle, Grid } from '@mui/material';
import OrderTracker from '../Order/OrderTracker';
import AddressCard from '../AddressCard/AddressCard';

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const navigate = useNavigate();
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order } = useSelector(store => store);

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);
        const paymentId = urlParam.get("razorpay_payment_id");
        const paymentStatus = urlParam.get("razorpay_payment_link_status");
        

        console.log("Retrieved Payment ID:", paymentId);
        console.log("Retrieved Payment Status:", paymentStatus);

        setPaymentId(paymentId);
        setPaymentStatus(paymentStatus);
    }, []);

    useEffect(() => {
        if (paymentId) {
            const data = { orderId, paymentId };
            dispatch(getOrderById(orderId));
            dispatch(updatePayment(data));
        }
    }, [orderId, paymentId, dispatch]);

    // Determine the current step for OrderTracker based on order status
    const getOrderStep = () => {
        switch (order?.order?.orderStatus) {
            case 'PLACED':
                return 1;
            case '"CONFIRMED"':
                return 2;
            case 'SHIPPED':
                return 3;
            case 'DELIVERED':
                return 4;
            default:
                return 0; // Initial step before order placement
        }
    };

    const handleImageClick = () => {
        // Navigate to the product details page
        navigate("/account/order");
    };

    return (
        <div className='px-2 lg:px-36'>
            <div className='flex flex-col justify-center items-center'>
                <Alert
                    variant='filled'
                    severity='success'
                    sx={{ mb: 6, width: "fit-content" }}
                >
                    <AlertTitle>Payment Success</AlertTitle>
                    Congratulations, Your Order has been Placed
                </Alert>
            </div>
            {/* Pass current order step based on status */}
            <OrderTracker activeStep={getOrderStep()} />

            <Grid container className='space-y-5 py-5 pt-20'>
                {order.order?.orderItem.map((item, index) => (
                    <Grid
                        key={index}
                        container
                        item
                        className="shadow-xl rounded-md p-5"
                        sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                        <Grid item xs={6}>
                            <div className="flex items-center">
                                <img
                                    className="w-[8rem] h-[8rem] object-cover object-top"
                                    src={item.product.imageUrl}
                                    alt="Product Image"
                                    onClick={handleImageClick}
                                />
                                <div className="ml-5 space-y-2">
                                    <p>{item.product.title}</p>
                                    <div className="opacity-50 text-xs font-semibold space-x-5">
                                        <span>Color: {item.product.color}</span>
                                        <span>Size: {item.size}</span>
                                    </div>
                                    <p>Seller: {item.product.brand}</p>
                                    <div className="space-x-3">
                                        <span>₹{item.discountedPrice}</span>
                                        <span className='opacity-50 line-through '>MRP ₹{item.price}</span>
                                        <span className='text-green-500 font-semibold '>{item.product.discountPersent}% off</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <AddressCard address={order.order?.shippingAddress} />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default PaymentSuccess;
