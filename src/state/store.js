import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import customerProductReducer from "./Product/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import wishlistReducer from "./Wishlist/Reducer";
import adminOrderReducer from "./Admin/Order/Reducer";
import reviewsReducer from "./Review/Reducer";
import ratingsReducer from "./Ratings/Reducer";

const rootReducers = combineReducers({

    auth:authReducer,
    products:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    wishlist:wishlistReducer,
    adminOrder:adminOrderReducer,
    reviews: reviewsReducer, 
    ratings: ratingsReducer,
})
export const store= legacy_createStore(rootReducers, applyMiddleware(thunk))