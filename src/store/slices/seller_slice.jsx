import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/config/firebase";

export const fetchSellers = createAsyncThunk(
  "sellers/fetchSellers",
  async () => {
    const snapshot = await getDocs(collection(db, "sellers"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellers.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default sellerSlice.reducer;
