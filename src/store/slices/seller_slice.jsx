import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../components/config/firebase";

export const fetchSellers = createAsyncThunk(
  "sellers/fetchSellers",
  async (_, thunkAPI) => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "seller"));

      const snapshot = await getDocs(q);

      const sellers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // ✅ Console fetched sellers from Firebase
      console.log("Fetched Sellers from Firebase:", sellers);

      return sellers;
    } catch (error) {
      console.error("Error fetching sellers:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
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
        console.log("Fetching sellers...");
      })

      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;

        // ✅ Console Redux state after update
        console.log("Sellers stored in Redux:", action.payload);
      })

      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;

        console.error("Fetch sellers failed:", action.payload);
      });
  },
});

export default sellerSlice.reducer;