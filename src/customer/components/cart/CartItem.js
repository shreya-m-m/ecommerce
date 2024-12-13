import { Button, IconButton } from '@mui/material';  
import React from 'react';  
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';  
import AddSharpIcon from '@mui/icons-material/AddSharp';  
import { useDispatch } from 'react-redux';  
import { addItemToWishlistFromCart, removeCartItem, updateCartItem } from '../../../state/Cart/Action';  
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item }) => {  
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    const token= localStorage.getItem("token")

    const handleUpdateCartItem = (num) => {  
       
        // const cartItemId = item.cartItems_id;   
        
        const data = { data:{quantity: item.quantity + num} ,cartItemId:item.cartItems_id
        };  

        console.log("dataaa",data)
        // Dispatch the action to update the cart item  
        dispatch(updateCartItem(data));  
    };  

    const handleRemoveItem = () => {  
        if (!item) {  
            console.error("Item is not defined");  
            return;  
        }  

        dispatch(removeCartItem(item.cartItems_id));  
    };  
    const handleMoveToWishlist =() =>{
        const reqData = {
            productId: item.product.product_id,
            size: item.size,
            quantity: 1, // or any desired quantity
            cartItemId: item.cartItems_id,
        };
        dispatch(addItemToWishlistFromCart(reqData, token));

    }
    const handleImageClick = () => {
        // Navigate to the product details page
        navigate(`/product/${item.product.product_id}`);
    };

    return (  
        <div className='p-5 shadow-lg border rounded-md'>  
            <div className='flex items-center'>  
                <div className='w-[8rem] h-[8rem] lg:w-[12rem] lg:h-[12rem]'>  
                    <img   
                        className='w-full h-full object-cover'   
                        src={item.product.imageUrl}   
                        alt={item.product.title || 'Product Image'}   
                        onClick={handleImageClick}
                    />  
                </div>  
                <div className='ml-5 space-y-1'>  
                    <p className='font-semibold'>{item.product.title}</p>  
                    <p className='opacity-60 text-left'>Size: {item.size}, {item.product.color}</p>  
                    <p className='opacity-60 mt-2 text-left'>Seller: {item.product.brand}</p>  
                    <div className='flex space-x-2 items-center text-gray-900 mt-6'>  
                        <p className="font-semibold">₹{item.discountedPrice}</p>  
                        <p className='opacity-50 line-through'>MRP ₹{item.price}</p>  
                        <p className='text-green-500 font-semibold'>{item.product.discountPersent}% off</p>  
                    </div>  
                </div>  
            </div>  
            <div className='lg:flex items-center lg:space-x-10 pt-4'>  
                <div className='flex items-center space-x-2'>  
                    <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={item.quantity <= 1}>  
                        <RemoveSharpIcon />  
                    </IconButton>  
                    <span className='py-1 px-7 border rounded-sm'>{item.quantity}</span>  
                    <IconButton onClick={() => handleUpdateCartItem(1)}>  
                        <AddSharpIcon />  
                    </IconButton>  
                </div>  
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>  
                    <Button onClick={handleRemoveItem} sx={{ color: "#555D50" }}>Remove</Button>  
                    <Button onClick={handleMoveToWishlist}sx={{ color: "#36454F" }}>Move To WishList</Button>  
                </div>  
            </div>  
        </div>  
    );  
};  

export default CartItem;