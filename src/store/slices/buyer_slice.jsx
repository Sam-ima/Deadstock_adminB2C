import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../components/config/firebase";

/* 🔹 Fetch buyers */
export const fetchBuyers = createAsyncThunk(
  "buyers/fetchBuyers",
  async (_, thunkAPI) => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "buyer"));
      const snapshot = await getDocs(q);

      const buyers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // ✅ Console buyers fetched from Firebase
      console.log("Fetched Buyers from Firebase:", buyers);

      return buyers;
    } catch (error) {
      console.error("Error fetching buyers:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
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
        console.log("Fetching buyers...");
      })

      .addCase(fetchBuyers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;

        // ✅ Console buyers stored in Redux
        console.log("Buyers stored in Redux:", action.payload);
      })

      .addCase(fetchBuyers.rejected, (state, action) => {
        state.loading = false;
        console.error("Fetch buyers failed:", action.payload);
      });
  },
});

export default buyerSlice.reducer;