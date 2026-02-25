import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../components/config/firebase";

/* ================================
   FETCH REVIEWS
================================ */
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const querySnapshot = await getDocs(collection(db, "reviews"));

    let reviews = [];

    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return reviews;
  }
);

/* ================================
   UPDATE REVIEW
================================ */
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, updatedData }) => {
    const reviewRef = doc(db, "reviews", id);

    await updateDoc(reviewRef, updatedData);

    return { id, updatedData };
  }
);

/* ================================
   DELETE REVIEW
================================ */
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id) => {
    const reviewRef = doc(db, "reviews", id);

    await deleteDoc(reviewRef);

    return id;
  }
);

/* ================================
   SLICE
================================ */
const reviewSlice = createSlice({
  name: "reviews",

  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* Fetch */
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Update */
      .addCase(updateReview.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;

        const index = state.reviews.findIndex(
          (review) => review.id === id
        );

        if (index !== -1) {
          state.reviews[index] = {
            ...state.reviews[index],
            ...updatedData,
          };
        }
      })

      /* Delete */
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      });
  },
});

export default reviewSlice.reducer;