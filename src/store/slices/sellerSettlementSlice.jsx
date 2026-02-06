import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../components/config/firebase";

/* ================= FETCH ================= */
export const fetchSellerSettlements = createAsyncThunk(
  "sellerSettlement/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, "seller_settlements"));

      console.log("🔥 Firestore snapshot size:", snapshot.size);

      const settlements = snapshot.docs.map(docSnap => {
        const data = docSnap.data();

        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : null,
          settledAt: data.settledAt?.toDate
            ? data.settledAt.toDate().toISOString()
            : null,
        };
      });

      console.log("🔥 Firestore data:", settlements);
      return settlements;

    } catch (error) {
      console.error("❌ Firestore fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);


/* ================= SETTLE ================= */
export const settleSellerPayment = createAsyncThunk(
  "sellerSettlement/settle",
  async (id) => {
    const ref = doc(db, "seller_settlements", id);

    await updateDoc(ref, {
      status: "settled",
      settledAt: serverTimestamp(),
    });

    return id;
  }
);

/* ================= DELETE ================= */
export const deleteSellerSettlement = createAsyncThunk(
  "sellerSettlement/delete",
  async (id) => {
    await deleteDoc(doc(db, "seller_settlements", id));
    return id;
  }
);

const sellerSettlementSlice = createSlice({
  name: "sellerSettlement",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchSellerSettlements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerSettlements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("🟢 Redux sellerSettlement state:", action.payload);

      })
      .addCase(fetchSellerSettlements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* SETTLE */
      .addCase(settleSellerPayment.fulfilled, (state, action) => {
        const row = state.data.find(r => r.id === action.payload);
        if (row) {
          row.status = "settled";
          row.settledAt = new Date().toISOString();
        }
      })

      /* DELETE */
      .addCase(deleteSellerSettlement.fulfilled, (state, action) => {
        state.data = state.data.filter(r => r.id !== action.payload);
      });
  },
});

export default sellerSettlementSlice.reducer;
