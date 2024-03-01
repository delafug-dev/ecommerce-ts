import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
    // Add your reducers here
    products: productReducer,
});

export default rootReducer;
