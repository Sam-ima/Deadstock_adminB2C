// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/order_slice"; 
import productReducer from "./slices/product_slice";
const store = configureStore({
  reducer: {
    orders: ordersReducer,
    product: productReducer,

  },
});

export default store;
