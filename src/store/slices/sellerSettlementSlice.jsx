import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc, // Add this import
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
      
      // DEBUG: Log the first settlement to see sellerId format
      if (settlementSnap.docs.length > 0) {
        console.log("📦 First settlement data:", {
          id: settlementSnap.docs[0].id,
          ...settlementSnap.docs[0].data()
        });
      }

      // 2️⃣ Try multiple possible seller collection names
      let sellerSnap;
      let sellersCollectionName = "sellers";
      
      try {
        sellerSnap = await getDocs(collection(db, "sellers"));
        console.log(`📁 'sellers' collection found with ${sellerSnap.docs.length} documents`);
      } catch (e) {
        console.log("❌ 'sellers' collection not accessible, trying 'users'");
        try {
          sellerSnap = await getDocs(collection(db, "users"));
          sellersCollectionName = "users";
          console.log(`📁 'users' collection found with ${sellerSnap.docs.length} documents`);
        } catch (e2) {
          console.log("❌ Neither 'sellers' nor 'users' collections found");
          sellerSnap = { docs: [] };
        }
      }

      // Create sellers map
      const sellersMap = sellerSnap.docs.reduce((acc, doc) => {
        const sellerData = doc.data();
        // Debug log each seller
        console.log(`👤 Seller found:`, {
          id: doc.id,
          uid: sellerData.uid,
          fullName: sellerData.fullName,
          shopName: sellerData.shopName,
          role: sellerData.role
        });
        
        acc[doc.id] = {
          id: doc.id,
          ...sellerData,
          displayName: sellerData.fullName || sellerData.shopName || sellerData.email || "Unknown Seller",
        };
        return acc;
      }, {});

      console.log("🗺️ Sellers mapped:", Object.keys(sellersMap));

      // 3️⃣ If no sellers found, try to fetch individual sellers for each settlement
      const settlements = await Promise.all(settlementSnap.docs.map(async (docSnap) => {
        const data = docSnap.data();
        let seller = sellersMap[data.sellerId];
        
        // If seller not found in map, try to fetch it directly
        if (!seller && data.sellerId) {
          console.log(`🔄 Attempting to fetch seller directly: ${data.sellerId}`);
          try {
            // Try both collections
            const sellerDoc = await getDoc(doc(db, "sellers", data.sellerId));
            if (sellerDoc.exists()) {
              seller = {
                id: sellerDoc.id,
                ...sellerDoc.data(),
                displayName: sellerDoc.data().fullName || sellerDoc.data().shopName || "Unknown Seller",
              };
              console.log("✅ Seller found via direct fetch:", seller.displayName);
            } else {
              // Try users collection
              const userDoc = await getDoc(doc(db, "users", data.sellerId));
              if (userDoc.exists()) {
                seller = {
                  id: userDoc.id,
                  ...userDoc.data(),
                  displayName: userDoc.data().fullName || userDoc.data().shopName || "Unknown Seller",
                };
                console.log("✅ Seller found in users collection:", seller.displayName);
              }
            }
          } catch (err) {
            console.log("❌ Error fetching seller directly:", err);
          }
        }

        console.log("🔗 Mapping:", {
          settlementId: docSnap.id,
          sellerId: data.sellerId,
          sellerFound: !!seller,
          sellerName: seller?.displayName
        });

        return {
          id: docSnap.id,
          subtotal: data.subtotal,
          commissionAmount: data.commissionAmount,
          amountToSeller: data.amountToSeller,
          productName: data.productName,
          sellerId: data.sellerId,
          sellerName: seller?.displayName || "Unknown Seller",
          sellerPhone: seller?.phone || "-",
          sellerEmail: seller?.email || "-",
          sellerShopName: seller?.shopName || "-",
          paymentMethod: data.paymentMethod || "ESEWA",
          status: data.status,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : null,
          settledAt: data.settledAt?.toDate
            ? data.settledAt.toDate().toISOString()
            : null,
        };
      }));

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