import {
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAILURE,
    CREATE_PRODUCTS_REQUEST,
    CREATE_PRODUCTS_SUCCESS,
    CREATE_PRODUCTS_FAILURE,
    UPDATE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_REQUEST,
    UPDATE_PRODUCTS_FAILURE
} from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    products: [],
    product: null
};

const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };

        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload };

        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload };

        case DELETE_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                deletedProduct: action.payload
            };
        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

            case UPDATE_PRODUCTS_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
            case UPDATE_PRODUCTS_SUCCESS:
                return {
                    ...state,
                    products: Array.isArray(state.products) ? 
                      state.products.map(product => 
                        product.product_id === action.payload.product_id ? action.payload : product
                      ) : [],
                  };
            case UPDATE_PRODUCTS_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
        default:
            return state;
    }
};

export default customerProductReducer;
