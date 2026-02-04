// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/order_slice"; 
import productReducer from "./slices/product_slice";
import commissionReducer from "./slices/commission_slice";
import sellerReducer from "./slices/seller_slice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    product: productReducer,
    commission: commissionReducer,
    sellers: sellerReducer,
  },
});

export default store;
