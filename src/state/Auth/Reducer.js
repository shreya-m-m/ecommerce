import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAILURE
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    token: null,
    users: [] // Add users to hold the list of all users
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GET_ALL_USER_REQUEST: // Added case for GET_ALL_USER_REQUEST
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                token: action.payload.token,
                error: null
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null
            };

        case GET_ALL_USER_SUCCESS: // Added case for GET_ALL_USER_SUCCESS
            return {
                ...state,
                isLoading: false,
                users: action.payload, // Set the users array with the list of users
                error: null
            };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case GET_ALL_USER_FAILURE: // Added case for GET_ALL_USER_FAILURE
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user =>
                    user.user_id === action.payload.user_id ? action.payload : user
                ),
            };


        case UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case LOGOUT:
            return {
                ...initialState
            };

        default:
            return state;
    }
};
