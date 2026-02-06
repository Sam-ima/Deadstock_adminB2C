import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../components/config/firebase";

/* 🔹 Fetch buyers */
export const fetchBuyers = createAsyncThunk(
  "buyers/fetchBuyers",
  async () => {
    const q = query(collection(db, "users"), where("role", "==", "buyer"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

const buyerSlice = createSlice({
  name: "buyers",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBuyers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBuyers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default buyerSlice.reducer;
