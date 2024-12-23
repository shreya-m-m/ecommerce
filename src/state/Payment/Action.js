import api, { API_BASE_URL } from "../../config/ApiConfig";

import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
} from "./ActionType";

// Create Payment Action
export const createPayment = (orderId) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST });

    try {
        // Sending the POST request to create payment and retrieve payment link
        const { data } = await api.post(`/api/payments/${orderId}`, {});
        dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });

        // Ensure we have a payment link before redirecting
        if (data.paymentLinkUrl) {

            console.log("REDIRECTION LINK ",data.paymentLinkUrl)
            window.location.href = data.paymentLinkUrl; 
        } else {
            console.error("Payment link URL not provided in the response");
        }
    } catch (error) {
        dispatch({
            type: CREATE_PAYMENT_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

// Update Payment Action
export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST });

    const { paymentId, orderId } = reqData;

    try {
        // Sending GET request to fetch payment status with payment ID and order ID
        const { data } = await api.get(`/api/payments?payment_id=${paymentId}&order_id=${orderId}`);
        dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PAYMENT_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};
