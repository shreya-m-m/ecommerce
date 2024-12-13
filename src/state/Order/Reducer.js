import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE
} from "./ActionType";

const initialState = {
    orders: [],  // List of all orders
    order: null, // Single order (used for fetching order by ID)
    error: null, 
    loading: false, 
    success: false 
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        // CREATE ORDER
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                orders: [...state.orders, action.payload] // Add the new order to the list
            };

        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // GET ORDER BY ID
        case GET_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload, // Set the single order in state
                error: null
            };

        case GET_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // GET ALL ORDERS
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload, // This will be the single order if fetching by ID
                orders: action.payload.orders || [], // Ensure `orders` is populated correctly if it's a list
                error: null
            };

        case GET_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
