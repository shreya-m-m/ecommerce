import {
    CREATE_RATING_REQUEST,
    CREATE_RATING_SUCCESS,
    CREATE_RATING_FAILURE,
    GET_RATINGS_REQUEST,
    GET_RATINGS_SUCCESS,
    GET_RATINGS_FAILURE,
    UPDATE_RATING_SUCCESS, // New action type for updating a rating
} from "./ActionType";

const initialState = {
    ratings: [],  // Store all ratings
    rating: null, // This will hold the current or selected rating (null by default)
    loading: false,
    error: null,
};

const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RATING_REQUEST:
        case GET_RATINGS_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_RATING_SUCCESS:
            // When a new rating is created, add it to the ratings array
            return { 
                ...state, 
                loading: false, 
                ratings: [...state.ratings, action.payload], 
                rating: action.payload, // Optionally, set the latest rating
            };

        case GET_RATINGS_SUCCESS:
            // When ratings are fetched, set the ratings array
            return { 
                ...state, 
                loading: false, 
                ratings: action.payload,
                rating: action.payload.length > 0 ? action.payload[0] : null, // Optionally set the first rating
            };

        // case UPDATE_RATING_SUCCESS:
        //     // When a rating is updated, find the rating in the array and update it
        //     const updatedRatings = state.ratings.map(rating => 
        //         rating.rating_id === action.payload.rating_id 
        //         ? { ...rating, rating: action.payload.rating } 
        //         : rating
        //     );
        //     return {
        //         ...state,
        //         ratings: updatedRatings,
        //         rating: action.payload, // Set the updated rating as the current rating
        //     };

        // case CREATE_RATING_FAILURE:
        // case GET_RATINGS_FAILURE:
        //     return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default ratingsReducer;
