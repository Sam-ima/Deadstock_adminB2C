import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../components/config/firebase";

/* 🔹 Fetch all commissions */
export const fetchCommissions = createAsyncThunk(
  "commissions/fetchCommissions",
  async () => {
    const querySnapshot = await getDocs(collection(db, "commissions"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  }
);

/* 🔹 Update commission */
export const updateCommission = createAsyncThunk(
  "commissions/updateCommission",
  async ({ id, updatedData }) => {
    const docRef = doc(db, "commissions", id);
    await updateDoc(docRef, updatedData);
    return { id, updatedData };
  }
);

/* 🔹 Delete commission */
export const deleteCommission = createAsyncThunk(
  "commissions/deleteCommission",
  async (id) => {
    await deleteDoc(doc(db, "commissions", id));
    return id;
  }
);

const commissionSlice = createSlice({
  name: "commissions",
  initialState: {
     list: [],  
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Fetch */
      .addCase(fetchCommissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommissions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCommissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Update */
      .addCase(updateCommission.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = {
            ...state.data[index],
            ...action.payload.updatedData,
          };
        }
      })

      /* Delete */
      .addCase(deleteCommission.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default commissionSlice.reducer;
