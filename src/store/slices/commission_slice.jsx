import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../components/config/firebase";

/**
 * 🔹 Fetch all commission transactions
 */
export const fetchCommissions = createAsyncThunk(
  "commission/fetchCommissions",
  async () => {
    const snapshot = await getDocs(collection(db, "commissions"));

    const data = snapshot.docs.map((docSnap) => {
      const docData = docSnap.data();

      return {
        id: docSnap.id,
        ...docData,

        // ✅ convert Firestore Timestamp → JS Date (serializable)
        createdAt: docData.createdAt?.toDate
          ? docData.createdAt.toDate()
          : null,
        settledAt: docData.settledAt?.toDate
          ? docData.settledAt.toDate()
          : null,
      };
    });

    console.log("🔥 Commissions fetched from Firestore:", data);
    return data;
  }
);

/**
 * 🔹 Settle commission (Pay Seller)
 */
export const settleCommission = createAsyncThunk(
  "commission/settleCommission",
  async (commissionId) => {
    const ref = doc(db, "commissions", commissionId);

    await updateDoc(ref, {
      status: "settled",
      settledAt: serverTimestamp(),
    });

    return commissionId;
  }
);

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCommissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommissions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // Settle
      .addCase(settleCommission.fulfilled, (state, action) => {
        const commission = state.list.find(
          (c) => c.id === action.payload
        );

        if (commission) {
          commission.status = "settled";
          commission.settledAt = new Date();
        }
      });
  },
});

export default commissionSlice.reducer;
  