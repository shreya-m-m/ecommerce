import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../../state/Order/Action';

const orderStatus = [
  { label: "Placed", value: "placed" },
  { label: "Shipped", value: "shipped" },
  { label: "On the Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Return", value: "return" },
  
];

const Order = () => {
  const [selectedStatus, setSelectedStatus] = useState([]);  // Keeps track of selected checkboxes
  const dispatch = useDispatch();
  const { order } = useSelector(store => store);
  const token = localStorage.getItem("token");

  // Handle checkbox change to filter based on selected statuses
  const handleCheckboxChange = (value) => {
    setSelectedStatus((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((status) => status !== value)  // Deselect
        : [...prevSelected, value]  // Select
    );
  };

  useEffect(() => {
    dispatch(getOrder(token)); // Fetch orders on component mount
  }, [dispatch, token]);

  // Filter orders based on selected statuses
  const filteredOrders = selectedStatus.length > 0 
    ? order.order?.filter((orderItem) =>
        selectedStatus.includes(orderItem.orderStatus?.toLowerCase())
      )
    : order.order;

  return (
    <div className="mt-5 mb-8 px-5 lg:px-20">
      <Grid container sx={{ justifyContent: "space-between" }}>
        {/* Filter Sidebar */}
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">Order Status</h1>
              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedStatus.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Order Items Display */}
        <Grid item xs={9}>
          <div className="space-y-5">
            {/* Render orders based on filter */}
            {filteredOrders?.length > 0
              ? filteredOrders.map((orderItem) => (
                  <div key={orderItem.order_id}>
                    {orderItem.orderItem?.map((item) => (
                      <OrderCard item={item} key={item.orderItem_id} />
                    ))}
                  </div>
                ))
              : <p>You Don't Have Any Orders.</p>}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
