
import {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAILURE,
  } from "./ActionType";
const initialState = {
    reviews: [],
    loading: false,
    error: null,
  };
  
  const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_REVIEW_REQUEST:
      case GET_REVIEWS_REQUEST:
        return { ...state, loading: true, error: null };
        
      case CREATE_REVIEW_SUCCESS:
        return { ...state, loading: false, reviews: [...state.reviews, action.payload] };
  
      case GET_REVIEWS_SUCCESS:
        return { ...state, loading: false, reviews: action.payload };
  
      case CREATE_REVIEW_FAILURE:
      case GET_REVIEWS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default reviewsReducer;
  
  