import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { AccountBoxOutlined, CurrencyRupee, Store, TrendingUp } from '@mui/icons-material';
import { getOrder } from '../../state/Admin/Order/Action';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getAllUsers } from '../../state/Auth/Action';


const MonthlyOverview = () => {
    const dispatch=useDispatch();
    const {adminOrder} = useSelector(store=>store)
    const token = localStorage.getItem('token');
    const totalProduct = useSelector((state) => state.products?.products?.totalElements || 0);
    const totalOrders = adminOrder?.orders?.length || 0;
    const totalCustomer = useSelector((state) => state.auth?.users?.length || 0);

    useEffect(() =>{
      
        dispatch(getOrder());
    }, [adminOrder.confirmed,adminOrder.delivered,adminOrder.shipped,adminOrder.deleteOrders]);
    useEffect(() => {
        dispatch(getAllUsers(token));
    }, [dispatch, token]);
   
    const salesData = [
        {
            stats: totalOrders,
            title: "Orders",
            color: "primary",
            icon: <ShoppingCartIcon sx={{ fontSize: "1.75rem" }} />
        },
        {
            stats: totalCustomer,
            title: "Customers",
            color: "success",
            icon: <AccountBoxOutlined sx={{ fontSize: "1.75rem" }} />
        },
        {
            stats: totalProduct,
            title: "Products",
            color: "warning",
            icon: <Store sx={{ fontSize: "1.75rem" }} />
        },
    ];

    return (
        <Card>
            <CardHeader
                title="Monthly Overview"
              
                titleTypographyProps={{
                    sx: { mb: 2.5, lineHeight: '2rem !important', letterSpacing: '0.50px !important' }
                }}
            />
            <CardContent sx={{ pt: (theme) => `${theme.spacing(0)} !important` }}>
                <Grid container spacing={20}>
                    {salesData.map((item, index) => (
                        <Grid item xs={12} sm={3} key={index}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        mr: 3,
                                        width: 44,
                                        height: 44,
                                        boxShadow: 3,
                                        color: "white",
                                        bgcolor: `${item.color}.main`
                                    }}
                                >
                                    {item.icon}
                                </Avatar>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant="caption">{item.title}</Typography>
                                    <Typography variant="h6">{item.stats}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MonthlyOverview;
