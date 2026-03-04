import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../components/config/firebase";

export const fetchSellers = createAsyncThunk(
  "sellers/fetchSellers",
  async () => {
    const q = query(collection(db, "users"), where("role", "==", "seller"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSellers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default sellerSlice.reducer;
