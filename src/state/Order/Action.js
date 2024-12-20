import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ORDERITEM_BY_ID_REQUEST,
    GET_ORDERITEM_BY_ID_SUCCESS,
    GET_ORDERITEM_BY_ID_FAILURE
} from "./ActionType";
import api from "../../config/ApiConfig";

// Create Order Action
export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post('/api/orders/', reqData.address);
        console.log("dataaa", data);
        if (data.order_id) {
            reqData.navigate({ search: `step=3&order_id=${data.order_id}` });
        }

        console.log("Created order - ", data);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("Catch error:", error);
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message,
        });
    }
};

//Get Order by ID Action
export const getOrderById = (reqData,token) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    const { orderId } = reqData;

    console.log("Order Id ",orderId)
    try {
        console.log("Order id in action" , orderId);
        const { data } = await api.get(`/api/orders/account/order/${orderId}`, {  
            headers: {  
                Authorization: `Bearer ${token}`,  
            },  
        });  
        
        console.log("Order by ID is", data);
        dispatch({
            type: GET_ORDER_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("Catch error:", error);
        dispatch({
            type: GET_ORDER_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};

// Get All Orders Action (with the `/account/order` path)
export const getOrder = (token) => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
        const { data } = await api.get('/api/orders/account/order', {  
            headers: {  
                Authorization: `Bearer ${token}`,  
            },  
        });  
        console.log("Fetched orders: ", data);
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("Catch error:", error);
        dispatch({
            type: GET_ORDER_FAILURE,
            payload: error.message,
        });
    }
};

export const getOrderItemById = (reqData,token) => async (dispatch) => {
    dispatch({ type: GET_ORDERITEM_BY_ID_REQUEST });
    const { orderItemId } = reqData;

    console.log("OrderItem Id ",orderItemId)
    try {
        console.log("Order id in action" , orderItemId);
        const { data } = await api.get(`/api/orders/account/orderItem/${orderItemId}`, {  
            headers: {  
                Authorization: `Bearer ${token}`,  
            },  
        });  
        
        console.log("OrderItem by ID is", data);
        dispatch({
            type: GET_ORDERITEM_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("Catch error:", error);
        dispatch({
            type: GET_ORDERITEM_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};
