import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, styled, Typography } from '@mui/material';
import { findProducts } from '../../state/Product/Action';


const Achivement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const totalCount = useSelector((state) => state.products?.products?.totalElements || 0);

    useEffect(() => {
        dispatch(findProducts({
            category: "",
            colors: [],
            sizes: [],
            minPrice: 0,
            maxPrice: 100000,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: 0,
            pageSize: 200,
        }));
    }, [dispatch]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
                   Total Producuts 
                </Typography>
                <Typography variant="h5" sx={{ my: 3.1 }}>
                    {totalCount} Products
                </Typography>
                <Button 
                    size="small" 
                    variant="contained" 
                    onClick={() => navigate('/admin/products')}
                >
                    View
                </Button>
            </CardContent>
        </Card>
    );
};

export default Achivement;
