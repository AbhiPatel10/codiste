"use client";

// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // Initialize with an empty array
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Add action to create a user
    createUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Add action to update a user
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
