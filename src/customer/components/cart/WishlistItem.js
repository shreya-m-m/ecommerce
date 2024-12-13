import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCartFromWishlist, removeWishlistItem, updateWishlistItem } from '../../../state/Wishlist/Action';
import { addItemToCart } from '../../../state/Cart/Action';

const WishlistItem = ({item}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token= localStorage.getItem("token")
  


const handleAddToBag = () => {
    const reqData = {
        productId: item.product.product_id,
        size: item.size,
        quantity: 1, // or any desired quantity
        wishlistItemId: item.wishlistItems_id,
    };
    dispatch(addItemToCartFromWishlist(reqData, token)); 
    navigate("/cart")
};
const handleImageClick = () => {
  // Navigate to the product details page
  navigate(`/product/${item.product.product_id}`);
};
  

  return (
    <div className='p-5 shadow-lg border rounded-md w-full'>
      <div className='flex flex-col items-center'>
        <div className='w-[8rem] h-[8rem] lg:w-[12rem] lg:h-[12rem]'>
          <img className='w-full h-full object-cover' src={item.product.imageUrl} alt='Product Image'  onClick={handleImageClick}/>
         
        </div>

        <div className='mt-5 text-center'>
          <p className='font-semibold text-left'>{item.product.title}</p>
          <p className='opacity-60 text-left'>Size: {item.size}, {item.product.color}</p>
          <p className='opacity-60 mt-2 text-left'>Seller: {item.product.brand}</p>

          <div className='flex space-x-2 justify-center items-center text-gray-900 mt-3'>
            <p className="font-semibold">₹{item.product.discountedPrice}</p>
            <p className='opacity-50 line-through'>MRP ₹{item.product.price}</p>
            <p className='text-green-500 font-semibold'>{item.product.discountPersent}% off</p>
          </div>

          <Button 
            onClick={handleAddToBag} 
            variant="contained" 
            className="w-full mt-5" 
            sx={{ backgroundColor: 'white',color:"#DE3163" }}>
            Add To Bag
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
