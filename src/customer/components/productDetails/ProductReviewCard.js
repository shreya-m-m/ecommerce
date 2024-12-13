import { Avatar, Box, Grid, Rating } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const ProductReviewCard = ({ item }) => {
    const { ratings } = useSelector(store => store);

    const { review, createdAt, product, user } = item;

    // Find rating for the specific product_id and user_id by checking the product and user objects inside each rating
    const userRating = ratings.ratings.find(
        (r) => r.product?.product_id === product?.product_id && r.user?.user_id === user?.user_id
    )?.rating || 0;

    console.log("Ratings Array:", ratings.ratings);
    console.log("User ID:", user?.user_id);
    console.log("Product:", product?.product_id);
    console.log("UserRating:", userRating);

    return (
        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 36, height: 36}}>
                            {user.firstname.charAt(0)}
                        </Avatar>
                    </Box>
                </Grid>

                <Grid item xs={9}>
                    <div className='flex flex-col items-start space-y-2'>
                        <div className='text-left'>
                            {/* Display user name and date */}
                            <p className='mb-1 font-semibold opacity-50'>
                                {`${user.firstname} ${user.lastname} | ${new Date(createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}`}
                            </p>

                            {/* Display rating with star icon */}
                            <p className='flex items-center space-x-1'>
                                <Rating value={userRating} precision={0.5} readOnly size="small" />
                                <span className='text-sm text-gray-600'>{userRating}</span>
                            </p>
                        </div>

                        <p className='text-left'>
                            {review}
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductReviewCard;
