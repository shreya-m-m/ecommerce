import api from "../../config/ApiConfig";
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
        const { data } = await api.post(`/api/payments/${orderId}`, {});

        console.log('Api Response ',api)
        console.log("create payment data",data)

        if (data.paymentLinkUrl) {
            window.location.href = data.paymentLinkUrl;

            console.log("data.paymentLinkUrl", data.paymentLinkUrl)
        }
    } catch (error) {
        dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
    }
};

// Update Payment Action
export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST });

    try {
        const { data } = await api.get(`/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`);
        console.log("Update Payment data", data);
        dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
        console.error("Update Payment Error:", error);
        dispatch({
            type: UPDATE_PAYMENT_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};
