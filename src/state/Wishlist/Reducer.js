import { 
    ADD_ITEM_TO_WISHLIST_REQUEST,
    ADD_ITEM_TO_WISHLIST_SUCCESS,
    ADD_ITEM_TO_WISHLIST_FAILURE,
    REMOVE_WISHLIST_ITEM_REQUEST,
    REMOVE_WISHLIST_ITEM_SUCCESS,
    REMOVE_WISHLIST_ITEM_FAILURE,
    UPDATE_WISHLIST_ITEM_REQUEST,
    UPDATE_WISHLIST_ITEM_SUCCESS,
    UPDATE_WISHLIST_ITEM_FAILURE,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAILURE
} from "./ActionType";

const initialState = {
    wishlist: null,
    wishlistItems: [],
    loading: false,
    error: null
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_WISHLIST_REQUEST:
        case REMOVE_WISHLIST_ITEM_REQUEST:
        case UPDATE_WISHLIST_ITEM_REQUEST:
        case GET_WISHLIST_REQUEST:
            return { ...state, loading: true, error: null };

        case ADD_ITEM_TO_WISHLIST_SUCCESS:
            return {
                ...state,
                wishlistItems: [
                    ...state.wishlistItems, action.payload.wishlistItems
                ],
                loading: false,
                error: null
            };

        case ADD_ITEM_TO_WISHLIST_FAILURE:
        case REMOVE_WISHLIST_ITEM_FAILURE:
        case UPDATE_WISHLIST_ITEM_FAILURE:
        case GET_WISHLIST_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case REMOVE_WISHLIST_ITEM_SUCCESS:
            return {
                ...state,
                deleteWishlistItem: action.payload,
                loading: false,
                error: null
            };

        case UPDATE_WISHLIST_ITEM_SUCCESS:
            return {
                ...state,
                updateWishlistItem: action.payload,
                loading: false,
                error: null,
            };

        case GET_WISHLIST_SUCCESS:
            return {
                ...state,
                wishlist: action.payload,
                wishlistItems: action.payload.wishlistItem || [],
                loading: false,
                error: null
            };

        default:
            return state;
    }
};

export default wishlistReducer;
