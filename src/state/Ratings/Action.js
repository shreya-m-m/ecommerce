
import axios from "axios";
import {
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  GET_RATINGS_REQUEST,
  GET_RATINGS_SUCCESS,
  GET_RATINGS_FAILURE,
} from "./ActionType";
import { API_BASE_URL } from "../../config/ApiConfig";

// Action to create a rating
export const createRating = (ratingData) => async (dispatch) => {

  try {
    dispatch({ type: CREATE_RATING_REQUEST });

    const token = localStorage.getItem("token");
    // Make sure the ratingData is in the correct format
    console.log("Sending rating data:", ratingData);
    
    const { data } = await axios.post(`${API_BASE_URL}/api/ratings/create`, ratingData, {
      headers: {
        Authorization: `Bearer ${token}`, // Use token for authentication
      },
    });

    dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
    console.log("Rating data received:", data);
  } catch (error) {
    dispatch({
      type: CREATE_RATING_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.error("Error creating rating:", error);
  }
};

// Action to fetch ratig for a product
export const getProductRatings = (productId, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_RATINGS_REQUEST });

    const { data } = await axios.get(`${API_BASE_URL}/api/ratings/product/${productId}` , {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("API Response:", data);
    dispatch({ type: GET_RATINGS_SUCCESS, payload: data });
    console.log("Rating dataaaa",data)
  } catch (error) {
    dispatch({
      type: GET_RATINGS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
