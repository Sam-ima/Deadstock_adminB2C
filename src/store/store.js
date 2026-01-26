// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/order_slice"; 

const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export default store;
