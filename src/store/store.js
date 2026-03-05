// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/order_slice"; 
import productReducer from "./slices/product_slice";
// import commissionReducer from "./slices/commission_slice";
import sellerSettlementReducer from "./slices/sellerSettlementSlice";
import userReducer from "./slices/user_slice";
import sellerReducer from "./slices/seller_slice";
import buyerReducer from "./slices/buyer_slice";
import reviewReducer from "./slices/review_slice";
const store = configureStore({
  reducer: {
    orders: ordersReducer,
    product: productReducer,
    // commission: commissionReducer,
    users: userReducer,
    sellers: sellerReducer,
    sellerSettlement: sellerSettlementReducer,
    buyers: buyerReducer,
    reviews: reviewReducer,

  },
});

export default store;
