
import axios from "axios";
import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
} from "./ActionType";
import { API_BASE_URL } from "../../config/ApiConfig";

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    const token = localStorage.getItem("token");
    
    // Make sure the reviewData is in the correct format expected by the API
    console.log("Sending review data:", reviewData);
    
    const { data } = await axios.post(`${API_BASE_URL}/api/reviews/create`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });

    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    console.log("Review data received:", data);
  } catch (error) {
    // Improved error handling
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.error("Error creating review:", error);
  }
};


// Action to fetch reviews for a product
export const getProductReviews = (productId, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`${API_BASE_URL}/api/reviews/product/${productId}` , {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("API Response:", data);
    dispatch({ type: GET_REVIEWS_SUCCESS, payload: data });
    console.log("Reviwe dataaaa",data)
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
