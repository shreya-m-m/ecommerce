import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../state/Admin/Order/Action';

const SalesByCountries = () => {
  const dispatch=useDispatch();
   
  const { adminOrder } = useSelector((store) => store);


  // Ensure that adminOrder.orders is an array and filter by orderStatus
  const deliveredOrdersCount =
    Array.isArray(adminOrder?.orders) 
      ? adminOrder.orders.filter(order => order.orderStatus === "PLACED").length 
      : 0;

  useEffect(() => {
    // Trigger the getOrder action on specific changes in confirmed, delivered, shipped, and deleteOrders
    dispatch(getOrder());
  }, [adminOrder?.confirmed, adminOrder?.delivered, adminOrder?.shipped, adminOrder?.deleteOrders, dispatch]);

  return (
    <Card>
      <CardHeader title="Placed Orders Overview" />
      <CardContent>
        <Typography variant="h4" align="center">
          {deliveredOrdersCount}
        </Typography>
        <Typography variant="body1" align="center">
          Total Placed Orders
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SalesByCountries;
