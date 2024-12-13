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
import api, { API_BASE_URL } from "../../config/ApiConfig"; // Make sure to import your axios instance
import { useSelector } from "react-redux";

export const findProducts = (reqData) => async (dispatch) => {
   
    dispatch({ type: FIND_PRODUCTS_REQUEST });

    const { category, colors, sizes, minPrice, maxPrice, minDiscount, sort, pageNumber, pageSize } = reqData;

    // console.log("reqdata22222222",reqData)
    try {
        const token = localStorage.getItem("token");
        const {data} = await api.get(
            `/api/product?category=${category}&color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        // const product = useSelector(state => state.product);
        console.log("Product data:", data);

        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FIND_PRODUCTS_FAILURE,
            payload: error.message,
        });
    }

};
export const findProductById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
    const { productId } = reqData;

    console.log("Product Id ",productId)
    try {
        const { data } = await api.get(`/api/product/product_id/${productId}`);

        console.log("DATA..",data)
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};

// Delete Product Action
export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const {data} =await api.delete(`${API_BASE_URL}/api/admin/product/${productId}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: productId });
        console.log(`Product ${productId} deleted successfully.`);
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCTS_FAILURE,
            payload: error.message,
        });
        console.error("Error deleting product:", error);
    }
};

// Create Product Action
export const createProduct = (product) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const { data } = await api.post(`${API_BASE_URL}/api/admin/product/`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: data });
        console.log("Product created successfully:", data);
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCTS_FAILURE,
            payload: error.message,
        });
        console.error("Error creating product:", error);
    }
};
// Update Product Action
export const updateProduct = (productId, updatedProduct) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCTS_REQUEST });
    
    try {
        const token = localStorage.getItem("token");
        
        // Make a PUT request to update the product details
        const { data } = await api.put(
            `${API_BASE_URL}/api/admin/product/${productId}/update`, 
            updatedProduct, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        
        // Dispatch success action with the updated product data
        dispatch({ type: UPDATE_PRODUCTS_SUCCESS, payload: updatedProduct });
        console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
        // Dispatch failure action with error message
        dispatch({
            type: UPDATE_PRODUCTS_FAILURE,
            payload: error.message,
        });
        console.error("Error updating product:", error);
    }
};

