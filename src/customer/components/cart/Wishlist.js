import React, { useEffect } from 'react'
import WishlistItem from './WishlistItem'
import { useDispatch, useSelector } from 'react-redux'
import { getWishlistItems } from '../../../state/Wishlist/Action';

const Wishlist = () => {

  const dispatch = useDispatch();
  const {wishlist} = useSelector(store => store);
  const token= localStorage.getItem("token")

  useEffect(() => {
    dispatch(getWishlistItems(token))
  },[wishlist.updateWishlistItem,wishlist.deleteWishlistItem,dispatch,token])
   
    return(
        <div className='w-full'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {/* Display multiple products */}
          {wishlist.wishlist?.wishlistItems.map((item) => (
            <WishlistItem item={item} />
          ))|| <p>No Items In The Wishlist</p>
          }
        </div>
      </div>

    )
} 
export default  Wishlist