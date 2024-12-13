import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Rating, CircularProgress, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createReview } from '../../../state/Review/Action';
import { createRating } from '../../../state/Ratings/Action';

const ReviewRatingForm = ({ productId, open, onClose }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const dispatch = useDispatch();

  // Handle Review Change
  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setError(''); // Reset error when user starts typing again
  };

  // Handle Rating Change
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    setError(''); // Reset error when user selects rating
  };

  // Handle Submit for Review and Rating
  const handleSubmit = async () => {
    if (!review.trim()) {
      setError('Review cannot be empty.');
      return;
    }

    if (rating === 0) {
      setError('Please provide a rating.');
      return;
    }

    setLoading(true); // Show loading spinner
    setError(''); // Reset any previous error

    try {
      const reviewData = {
        productId,
        review,
        createdAt: new Date().toISOString(), // Use current system date
      };

      const ratingData = {
        productId,
        rating,
        createdAt: new Date().toISOString(), // Use current system date
      };

      // Dispatch the actions to create both review and rating
      await dispatch(createReview(reviewData)); // Dispatch review action
      await dispatch(createRating(ratingData)); // Dispatch rating action

      // Clear the form fields
      setReview('');
      setRating(0);

      // Close dialog after successful submission
      onClose();
    } catch (error) {
      setError('There was an error submitting your review and rating. Please try again.');
      console.error('Error submitting review and rating:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <Dialog
    open={open}
    onClose={onClose}
    maxWidth="lg" 
    PaperProps={{
        sx: {
            width: '60vw', 
            height: '48vh', 
            maxWidth: 'none', 
        },
    }}
>
      <DialogTitle>Add Review & Rating</DialogTitle>
      <DialogContent>
        {/* Error message */}
        {error && <Typography color="error" variant="body2">{error}</Typography>}

        {/* Review Input */}
        <TextField
          label="Your Review"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={review}
          onChange={handleReviewChange}
          error={!!error} // Highlight input in case of error
        />

        {/* Rating Input */}
        <div style={{ marginTop: 16 }}>
          <Rating
            name="product-rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          disabled={loading || !review.trim() || rating === 0}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewRatingForm;
