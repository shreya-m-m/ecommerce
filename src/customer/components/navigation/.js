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
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAILURE
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  createdProduct: null,
  updatedProduct: null,
  deletedProduct: null
};

const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
      // Request actions
      case FIND_PRODUCTS_REQUEST:
      case FIND_PRODUCT_BY_ID_REQUEST:
      case DELETE_PRODUCTS_REQUEST:
      case CREATE_PRODUCTS_REQUEST:
      case UPDATE_PRODUCTS_REQUEST:
          return { ...state, loading: true, error: null };

      // Success actions
      case FIND_PRODUCTS_SUCCESS:
          return { ...state, loading: false, products: action.payload, error: null };

      case FIND_PRODUCT_BY_ID_SUCCESS:
          return { ...state, loading: false, product: action.payload, error: null };

      case DELETE_PRODUCTS_SUCCESS:
          return { 
              ...state, 
              loading: false, 
              deletedProduct: action.payload, 
              products: state.products.filter(product => product.id !== action.payload),
              error: null 
          };

      case CREATE_PRODUCTS_SUCCESS:
          return { 
              ...state, 
              loading: false, 
              createdProduct: action.payload, 
              products: [...state.products, action.payload], 
              error: null 
          };

      case UPDATE_PRODUCTS_SUCCESS:
          return { 
              ...state, 
              loading: false, 
              updatedProduct: action.payload, 
              products: state.products.map(product =>
                  product.id === action.payload.id ? action.payload : product
              ), 
              error: null 
          };

      // Failure actions
      case FIND_PRODUCTS_FAILURE:
      case FIND_PRODUCT_BY_ID_FAILURE:
      case DELETE_PRODUCTS_FAILURE:
      case CREATE_PRODUCTS_FAILURE:
      case UPDATE_PRODUCTS_FAILURE:
          return { ...state, loading: false, error: action.payload };

      // Default state
      default:
          return state;
  }
};

export default customerProductReducer;
