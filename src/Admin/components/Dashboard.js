import { Grid, Box } from '@mui/material';
import React from 'react';
import Achivement from './Achivement';
import MonthlyOverview from './MonthlyOverview';
import ProductTableView from '../view/ProductTableView';
import OrdersTableView from '../view/OrderTableView';

const Dashboard = () => {
    return (
        <Box
            sx={{
                padding: '20px',
                marginTop: '80px', // Adjust to match the navbar height
                marginLeft: '15%', // Adjust to align with the sidebar width
                width: '85%', // Occupies the remaining space
            }}
        >
            <Grid container spacing={3}>
                {/* Achievements Section */}
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            boxShadow: 3,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            padding: 2,
                        }}
                    >
                        <Achivement />
                    </Box>
                </Grid>

                {/* Monthly Overview Section */}
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            boxShadow: 3,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            padding: 2,
                        }}
                    >
                        <MonthlyOverview />
                    </Box>
                </Grid>

                {/* Product Table Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            boxShadow: 3,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            padding: 2,
                            overflow: 'auto',
                        }}
                    >
                        <ProductTableView />
                    </Box>
                </Grid>

                {/* Orders Table Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            boxShadow: 3,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            padding: 2,
                            overflow: 'auto',
                        }}
                    >
                        <OrdersTableView />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
