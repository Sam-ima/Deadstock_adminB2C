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

/* ================= FETCH SELLER SETTLEMENTS ================= */
export const fetchSellerSettlements = createAsyncThunk(
  "sellerSettlement/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      // ✅ CORRECT COLLECTION NAME (PLURAL)
      const snapshot = await getDocs(
        collection(db, "commission_transactions")
      );

      console.log("🔥 Firestore snapshot size:", snapshot.size);

      const settlements = snapshot.docs.map(docSnap => {
        const data = docSnap.data();

        return {
          id: docSnap.id,

          // 🔹 Core fields
          amountToSeller: data.amountToSeller,
          commissionAmount: data.commissionAmount,
          commissionRate: data.commissionRate,
          subtotal: data.subtotal,
          quantity: data.quantity,

          // 🔹 Relations
          sellerId: data.sellerId,
          buyerId: data.buyerId,
          orderId: data.orderId,
          itemId: data.itemId,
          productId: data.productId,
          productName: data.productName,
          productPrice: data.productPrice,

          // 🔹 Payment
          paymentMethod: data.paymentMethod,
          paymentRefId: data.paymentRefId,
          paymentStatus: data.paymentStatus,

          // 🔹 Status
          status: data.status,

          // 🔹 Dates (serialized)
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : null,

          settledAt: data.settledAt?.toDate
            ? data.settledAt.toDate().toISOString()
            : null,
        };
      });

      console.log("🔥 Firestore settlements:", settlements);
      return settlements;

    } catch (error) {
      console.error("❌ Firestore fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

/* ================= SETTLE PAYMENT ================= */
export const settleSellerPayment = createAsyncThunk(
  "sellerSettlement/settle",
  async (id) => {
    await updateDoc(
      doc(db, "commission_transactions", id),
      {
        status: "settled",
        settledAt: serverTimestamp(),
      }
    );
    return id;
  }
);

/* ================= DELETE ================= */
export const deleteSellerSettlement = createAsyncThunk(
  "sellerSettlement/delete",
  async (id) => {
    await deleteDoc(
      doc(db, "commission_transactions", id)
    );
    return id;
  }
);

/* ================= SLICE ================= */
const sellerSettlementSlice = createSlice({
  name: "sellerSettlement",
  initialState: {
    settlements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder

      /* FETCH */
      .addCase(fetchSellerSettlements.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSellerSettlements.fulfilled, (state, action) => {
        state.loading = false;
        state.settlements = action.payload;
        console.log("🟢 Redux settlements:", action.payload);
      })
      .addCase(fetchSellerSettlements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SETTLE */
      .addCase(settleSellerPayment.fulfilled, (state, action) => {
        const row = state.settlements.find(
          r => r.id === action.payload
        );
        if (row) {
          row.status = "settled";
          row.settledAt = new Date().toISOString();
        }
      })

      /* DELETE */
      .addCase(deleteSellerSettlement.fulfilled, (state, action) => {
        state.settlements = state.settlements.filter(
          r => r.id !== action.payload
        );
      });
  },
});

export default sellerSettlementSlice.reducer;
