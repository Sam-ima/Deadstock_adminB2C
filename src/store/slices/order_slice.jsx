import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../components/config/firebase";

/**
 * 🔹 Helper: Convert Firestore Timestamp safely
 */
const convertTimestampToDate = (timestamp) => {
  if (!timestamp) return null;
  if (typeof timestamp.toDate === "function") {
    return timestamp.toDate(); // JS Date (serializable)
  }
  return timestamp;
};

/**
 * 🔹 Fetch all orders
 */
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const orders = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();

        return {
          id: docSnap.id,

          // Basic fields
          userId: data.userId,
          totalAmount: data.totalAmount,
          paymentMethod: data.paymentMethod,
          paymentStatus: data.paymentStatus,

          // Timestamp (FIXED)
          createdAt: convertTimestampToDate(data.createdAt),

          // Nested object
          deliveryDetails: {
            fullName: data.deliveryDetails?.fullName || "",
            phone: data.deliveryDetails?.phone || "",
            address: data.deliveryDetails?.address || "",
            city: data.deliveryDetails?.city || "",
            state: data.deliveryDetails?.state || "",
            zip: data.deliveryDetails?.zip || "",
          },

          // Array
          items: Array.isArray(data.items) ? data.items : [],
        };
      });

      return orders;
    } catch (error) {
      console.error("Fetch orders error:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 🔹 Update an order
 */
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, data);

      return { id, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 🔹 Delete an order
 */
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "orders", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    loading: false,
    error: null,
    selectedOrder: null,
  },
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Update Order
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (o) => o.id === action.payload.id
        );

        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload.data,
          };
        }
      })

      // 🔹 Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (o) => o.id !== action.payload
        );
      });
  },
});

export const { setSelectedOrder, clearSelectedOrder } =
  ordersSlice.actions;

export default ordersSlice.reducer;
