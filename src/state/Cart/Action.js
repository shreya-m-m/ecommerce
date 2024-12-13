import {  
    ADD_ITEM_TO_CART_REQUEST,  
    ADD_ITEM_TO_CART_SUCCESS,  
    ADD_ITEM_TO_CART_FAILURE,  
    REMOVE_CART_ITEM_REQUEST,  
    REMOVE_CART_ITEM_SUCCESS,  
    REMOVE_CART_ITEM_FAILURE,  
    UPDATE_CART_ITEM_REQUEST,  
    UPDATE_CART_ITEM_SUCCESS,  
    UPDATE_CART_ITEM_FAILURE,  
    GET_CART_REQUEST,  
    GET_CART_SUCCESS,  
    GET_CART_FAILURE  
} from "./ActionType";  
import api from "../../config/ApiConfig";  

// Get cart items action  
export const getCart = (token) => async (dispatch) => {  
    dispatch({ type: GET_CART_REQUEST });  
    try {  
        const { data } = await api.get('/api/cart/', {  
            headers: {  
                Authorization: `Bearer ${token}`,  
            },  
        });  
        dispatch({ type: GET_CART_SUCCESS, payload: data });  
        console.log("GET CART ITEMS", data);  
    } catch (error) {  
        dispatch({  
            type: GET_CART_FAILURE,  
            payload: error.response?.data?.message || error.message,  
        });  
    }  
};  

// Add item to cart action  
export const addItemToCart = (reqData) => async (dispatch) => {  
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });  
    try {  
        const { data } = await api.put("/api/cart/add", reqData); // Use POST for adding items  
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });  
        console.log("ADD TO CART DATA:", data);  
    } catch (error) {  
        dispatch({  
            type: ADD_ITEM_TO_CART_FAILURE,  
            payload: error.response?.data?.message || error.message || "Failed to add item to cart",  
        });  
    }  
};  

// Remove item from cart action  
export const removeCartItem = (cartItemId) => async (dispatch) => {  
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });  
    try {  
        await api.delete(`/api/cart_item/${cartItemId}`);  
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });  
        console.log("REMOVE FROM CART DATA:", cartItemId); 
    } catch (error) {  
        dispatch({  
            type: REMOVE_CART_ITEM_FAILURE,  
            payload: error.response?.data?.message || error.message || "Failed to remove item from cart",  
        });  
    }  
};  

// Update item in cart action  
export const updateCartItem = (reqData) => async (dispatch) => {  
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });  

    try {  
        const { data } = await api.put(`/api/cart_item/${reqData.cartItemId}`, reqData.data);  
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });  
        console.log("UPDATED DATA...", data);  
    } catch (error) {  
        dispatch({  
            type: UPDATE_CART_ITEM_FAILURE,  
            payload: error.response?.data?.message || error.message || "Failed to update item in cart",  
        });  
    }  
};
export const addItemToWishlistFromCart = (reqData, token) => async (dispatch) => {
    try {
        const { data } = await api.post('/api/cart/add-to-wishlist', reqData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Item Added to Wishlist:", data);
        dispatch(removeCartItem(reqData.cartItemId)); // Optionally remove from wishlist
    } catch (error) {
        console.log("Failed to add item to Wishlist:", error);
    }
};