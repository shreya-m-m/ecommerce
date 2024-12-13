import axios from "axios";
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
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILURE
} from "./ActionType";
import { API_BASE_URL } from "../../config/ApiConfig";

// Registration Actions
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (token) => ({ type: REGISTER_SUCCESS, payload: token });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: { message: error } });

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest()); // Dispatch the request action to indicate the loading state
    
    // Validate user input
    if (!userData.firstname || !userData.lastname || !userData.email || !userData.password) {
        dispatch(registerFailure("All fields are required."));
        return;
    }

    try {
        // Make the API call to the signup endpoint
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;

        // Check if the response contains a token
        if (user && user.token) {
            // Save the JWT token in localStorage and dispatch success action
            localStorage.setItem("token", user.token);
            dispatch(registerSuccess(user.token));
        } else {
            // Handle missing token scenario
            dispatch(registerFailure("JWT token is undefined or user object is missing."));
        }
    } catch (error) {
                 const errorMessage = "The email is already in use. Please try a different email.";
                dispatch(registerFailure(errorMessage));
                return { success: false, error: errorMessage };
    }
};


// Login Actions
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;

        if (user && user.token) {
            localStorage.setItem("token", user.token);
            dispatch(loginSuccess(user.token));
            return { success: true, token: user.token };
        } else {
            const errorMessage = "Invalid Credentials. Please enter the correct credentials.";
            dispatch(loginFailure(errorMessage));
            return { success: false, error: errorMessage };
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
        dispatch(loginFailure(errorMessage));
        return { success: false, error: errorMessage };
    }
};

// Get User Actions
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (token) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const user = response.data;
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
};

// Update User Actions
export const updateUser = (userId, updatedUser) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.put(
            `${API_BASE_URL}/api/users/${userId}/update`,
            updatedUser,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('Auth Response.........', data);
        // Dispatch success with API response data, not just updatedUser
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
        return data; // Return the response data for use in the component
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: error.response ? error.response.data.message : error.message,
        });
        throw error; // Rethrow error so it can be caught in the component
    }
};


// Get All Users Actions
const getAllUsersRequest = () => ({ type: GET_ALL_USER_REQUEST });
const getAllUsersSuccess = (users) => ({ type: GET_ALL_USER_SUCCESS, payload: users });
const getAllUsersFailure = (error) => ({ type: GET_ALL_USER_FAILURE, payload: error });

export const getAllUsers = (token) => async (dispatch) => {
    
    dispatch(getAllUsersRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/product/all-users`,{
            headers: { Authorization: `Bearer ${token}` }
        });
        const users = response.data;
        dispatch(getAllUsersSuccess(users));
        console.log("Geting all the users ", users)
    } catch (error) {
        dispatch(getAllUsersFailure(error.message));
    }
};

// Logout Action
export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
};
