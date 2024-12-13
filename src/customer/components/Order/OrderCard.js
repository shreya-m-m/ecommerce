import React from 'react';
import { Grid } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ item }) => {
    const { order } = useSelector(store => store);
    const navigate = useNavigate();

    const handleImageClick = () => {
        // Navigate to the product details page
        navigate(`/product/${item.product.product_id}`);
    };

    // Log order details for debugging
    // console.log("Order Details:", order);
    console.log("Current Item:", item);

    // // Log the orderItem_id of the current item for debugging
    // console.log("Current Item Order Item ID:", item?.orderItem_id);

    // Find the specific order and get the orderStatus based on orderItem_id
    const orderStatus = order?.order?.find(ord => ord?.orderItem?.[0]?.orderItem_id === item?.orderItem_id)?.orderStatus || "PAYMENT FAILED";

    // Log the resolved orderStatus for debugging
    // console.log("Resolved Order Status:", orderStatus);

    // Order status styles based on different statuses
    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case "DELIVERED":
                return "bg-green-600 text-green-600";
            case "CONFIRMED":
                return "bg-green-500 text-white";
            case "SHIPPED":
                return "bg-blue-500 text-white";
            case "CANCELED":
                return "bg-red-500 text-white";
            case "PLACED":
                return "bg-green-800 text-white";
            default:
                return "bg-red-400 text-white";
        }
    };

    return (
        <div className="p-5 shadow-md hover:shadow-2xl border">
            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                {/* Product Image and Details */}
                <Grid item xs={6}>
                    <div className="flex">
                        <img
                            className="w-[7rem] h-[7rem] object-cover cursor-pointer"
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            onClick={handleImageClick} // Handle image click
                        />
                        <div className="ml-3 space-y-2">
                            <p className="font-semibold">{item.product.title}</p>
                            <p className="opacity-50 text-xs font-semibold">Size: {item.size}</p>
                            <p className="opacity-50 text-xs font-semibold">Color: {item.product.color}</p>
                        </div>
                    </div>
                </Grid>

                {/* Product Price */}
                <Grid item xs={2}>
                    <p className="font-semibold">Price: ₹{item.discountedPrice}</p>
                </Grid>

                {/* Order Status */}
                <Grid item xs={4}>
                    {orderStatus.toLowerCase() === "delivered" ? (
                        <div>
                            <p className="flex items-center">
                                <AdjustIcon
                                    sx={{ width: "15px", height: "15px" }}
                                    className="text-green-600 mr-2"
                                />
                                <span className="text-green-600 font-medium">
                                    {orderStatus}
                                </span>
                            </p>
                            <p className="text-xs opacity-50">Your item has been delivered</p>
                        </div>
                    ) : (
                        <div>
                            <p className="flex items-center">
                                <span
                                    className={`${getStatusStyle(orderStatus)} text-white px-2 py-1 rounded mr-2`}
                                >
                                    {orderStatus}
                                </span>
                                <span className="text-xs opacity-50">
                                    {(orderStatus === "CANCELED" || orderStatus === "PAYMENT FAILED")
                                        ? "Your order has been canceled."
                                        : "Order is in progress."}
                                </span>
                            </p>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default OrderCard;
