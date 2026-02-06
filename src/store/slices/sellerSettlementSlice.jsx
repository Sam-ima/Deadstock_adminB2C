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
      console.log("🚀 Fetching settlements + sellers");

      // 1️⃣ Fetch settlements
      const settlementSnap = await getDocs(
        collection(db, "commission_transactions")
      );

      // 2️⃣ Fetch sellers (THIS IS THE FIX)
      const sellerSnap = await getDocs(collection(db, "sellers"));

      const sellersMap = {};
      sellerSnap.docs.forEach(doc => {
        sellersMap[doc.id] = doc.data(); // 🔑 doc.id === sellerId
      });

      console.log("🗺️ Sellers mapped:", Object.keys(sellersMap));

      // 3️⃣ Merge data
      const settlements = settlementSnap.docs.map(docSnap => {
        const data = docSnap.data();
        const seller = sellersMap[data.sellerId];

        console.log("🔗 Mapping:", {
          settlementId: docSnap.id,
          sellerId: data.sellerId,
          sellerFound: !!seller,
        });

        return {
          id: docSnap.id,

          // Amounts
          subtotal: data.subtotal,
          commissionAmount: data.commissionAmount,
          amountToSeller: data.amountToSeller,

          // Product
          productName: data.productName,

          // ✅ Seller info (NOW ALWAYS WORKS)
          sellerId: data.sellerId,
          sellerName: seller?.shopName || seller?.fullName || "Unknown Seller",
          sellerPhone: seller?.phone || "-",
          sellerEmail: seller?.email || "-",

          // Payment
          paymentMethod: data.paymentMethod || "ESEWA",
          status: data.status,

          // Dates
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : null,
          settledAt: data.settledAt?.toDate
            ? data.settledAt.toDate().toISOString()
            : null,
        };
      });

      console.log("✅ Final settlements:", settlements);
      return settlements;
    } catch (error) {
      console.error("❌ Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

/* ================= SETTLE PAYMENT ================= */
export const settleSellerPayment = createAsyncThunk(
  "sellerSettlement/settle",
  async (id) => {
    await updateDoc(doc(db, "commission_transactions", id), {
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
    await deleteDoc(doc(db, "commission_transactions", id));
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
      .addCase(fetchSellerSettlements.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSellerSettlements.fulfilled, (state, action) => {
        state.loading = false;
        state.settlements = action.payload;
      })
      .addCase(fetchSellerSettlements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(settleSellerPayment.fulfilled, (state, action) => {
        const row = state.settlements.find(r => r.id === action.payload);
        if (row) {
          row.status = "settled";
          row.settledAt = new Date().toISOString();
        }
      })
      .addCase(deleteSellerSettlement.fulfilled, (state, action) => {
        state.settlements = state.settlements.filter(
          r => r.id !== action.payload
        );
      });
  },
});

export default sellerSettlementSlice.reducer;
