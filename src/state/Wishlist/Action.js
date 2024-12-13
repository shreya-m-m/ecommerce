import {
    ADD_ITEM_TO_WISHLIST_REQUEST,
    ADD_ITEM_TO_WISHLIST_SUCCESS,
    ADD_ITEM_TO_WISHLIST_FAILURE,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAILURE,
    REMOVE_WISHLIST_ITEM_REQUEST,
    REMOVE_WISHLIST_ITEM_SUCCESS,
    REMOVE_WISHLIST_ITEM_FAILURE,
    UPDATE_WISHLIST_ITEM_REQUEST,
    UPDATE_WISHLIST_ITEM_SUCCESS,
    UPDATE_WISHLIST_ITEM_FAILURE
} from "./ActionType";
import api from "../../config/ApiConfig";

// Get wishlist items action
export const getWishlistItems = (token) => async (dispatch) => {
    dispatch({ type: GET_WISHLIST_REQUEST });
    try {
        const { data } = await api.get('/api/wishlist/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: GET_WISHLIST_SUCCESS, payload: data });
        console.log("Get Wishlist Items...", data);
    } catch (error) {
        dispatch({
            type: GET_WISHLIST_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Add item to wishlist action
export const addItemToWishlist = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_WISHLIST_REQUEST });
    try {
        const { data } = await api.put("/api/wishlist/add", reqData);
        dispatch({ type: ADD_ITEM_TO_WISHLIST_SUCCESS, payload: data });
        console.log("ADD TO WISHLIST DATA:", data);
    } catch (error) {
        console.log(error);
        dispatch({
            type: ADD_ITEM_TO_WISHLIST_FAILURE,
            payload: error.response?.data?.message || error.message || "Something went wrong",
        });
    }
};

// Remove item from wishlist action
export const removeWishlistItem = (wishlistItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_WISHLIST_ITEM_REQUEST });
    try {
        const { data } = await api.delete(`/api/wishlist_item/${wishlistItemId}`);
        dispatch({ type: REMOVE_WISHLIST_ITEM_SUCCESS, payload: data });
        console.log("Remove from wishlist data ", wishlistItemId);
    } catch (error) {
        dispatch({
            type: REMOVE_WISHLIST_ITEM_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Update item in wishlist action
export const updateWishlistItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_WISHLIST_ITEM_REQUEST });

    try {
        const { data } = await api.put(`/api/wishlist_item/${reqData.wishlistItemId}`, reqData.data);
        dispatch({ type: UPDATE_WISHLIST_ITEM_SUCCESS, payload: data });
        console.log("UPDATED DATA...", data);
    } catch (error) {
        dispatch({
            type: UPDATE_WISHLIST_ITEM_FAILURE,
            payload: error.response?.data?.message || error.message || "Failed to update item in Wishlists",
        });
    }
};

// Add item to cart from wishlist action
export const addItemToCartFromWishlist = (reqData, token) => async (dispatch) => {
    try {
        const { data } = await api.post('/api/wishlist/add-to-cart', reqData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Item Added to Cart:", data);
        dispatch(removeWishlistItem(reqData.wishlistItemId)); // Optionally remove from wishlist
    } catch (error) {
        console.log("Failed to add item to cart:", error);
    }
};
