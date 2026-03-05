// src/redux/slices/userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../components/config/firebase";

/* =====================================================
   🔥 FETCH USERS (role = both)
===================================================== */
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const q = query(
        collection(db, "users"),
        where("role", "==", "both")
      );

      const snapshot = await getDocs(q);

      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* =====================================================
   ✏ UPDATE USER
===================================================== */
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const userRef = doc(db, "users", id);

      await updateDoc(userRef, {
        ...updatedData,
        updatedAt: new Date(),
      });

      return { id, updatedData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* =====================================================
   🗑 DELETE USER
===================================================== */
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await deleteDoc(doc(db, "users", id));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* =====================================================
   SLICE
===================================================== */
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* 🔥 FETCH */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ✏ UPDATE */
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;

        const index = state.users.findIndex((u) => u.id === id);
        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            ...updatedData,
          };
        }
      })

      /* 🗑 DELETE */
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;