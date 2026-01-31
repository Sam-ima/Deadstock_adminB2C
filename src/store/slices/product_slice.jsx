import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../components/config/firebase";

/* ===================== THUNKS ===================== */

// Fetch categories, subcategories, products
export const fetchAllData = createAsyncThunk(
  "product/fetchAllData",
  async () => {
    const [categoriesSnap, subcategoriesSnap, productsSnap] =
      await Promise.all([
        getDocs(collection(db, "categories")),
        getDocs(collection(db, "subcategories")),
        getDocs(collection(db, "products")),
      ]);

    return {
      categories: categoriesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      subcategories: subcategoriesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      products: productsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
    };
  }
);

// Add product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const docRef = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, ...product };
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }) => {
    await updateDoc(doc(db, "products", id), {
      ...data,
      updatedAt: new Date(),
    });
    return { id, ...data };
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await deleteDoc(doc(db, "products", id));
    return id;
  }
);

/* ===================== SLICE ===================== */

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
    subcategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      /* FETCH */
      .addCase(fetchAllData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.subcategories = action.payload.subcategories;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* ADD */
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        );
      })

      /* DELETE */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
