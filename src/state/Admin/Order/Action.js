import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    CONFIRMED_ORDER_FAILURE,
    PLACED_ORDER_REQUEST,
    PLACED_ORDER_SUCCESS,
    PLACED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    CANCELED_ORDER_REQUEST,
    CANCELED_ORDER_SUCCESS,
    CANCELED_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    SHIP_ORDER_REQUEST,
    SHIP_ORDER_SUCCESS,
    SHIP_ORDER_FAILURE,
} from './ActionType';

import api from '../../../config/ApiConfig';

// Get Order Action
export const getOrder = () => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
        const { data } = await api.get('/api/admin/orders/');
        console.log('Get all the customer Order',data)
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAILURE,
            payload: error.message,
        });
    }
};

// Confirm Order Action
export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/confirmed`);
        console.log("Confirmed Orders",data)
        dispatch({
            type: CONFIRMED_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CONFIRMED_ORDER_FAILURE ,
            payload: error.message,
        });
    }
};

// Place Order Action
// export const placeOrder = (reqData) => async (dispatch) => {
//     dispatch({ type: PLACED_ORDER_REQUEST });
//     try {
//         const { data } = await api.post('/api/orders/', reqData);
//         dispatch({
//             type: PLACED_ORDER_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: PLACED_ORDER_FAILURE,
//             payload: error.message,
//         });
//     }
// };

// Deliver Order Action
export const deliverOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/deliver`);
        console.log("Deliverd Order",data)
        dispatch({
            type: DELIVERED_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELIVERED_ORDER_FAILURE,
            payload: error.message,
        });
    }
};

// Cancel Order Action
export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCELED_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/cancel`);
        console.log("Cancel Order",data)
        dispatch({
            type: CANCELED_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CANCELED_ORDER_FAILURE,
            payload: error.message,
        });
    }
};

// Delete Order Action
export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
       const {data}= await api.delete(`/api/admin/orders/${orderId}/delete`);
        console.log("Delete order",data)
        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: orderId,
        });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAILURE,
            payload: error.message,
        });
    }
};

// Ship Order Action
export const shipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
        console.log("Shipped Order",data)
        dispatch({
            type: SHIP_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SHIP_ORDER_FAILURE,
            payload: error.message,
        });
    }
};
