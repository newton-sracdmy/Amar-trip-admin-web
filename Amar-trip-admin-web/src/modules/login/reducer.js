import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./action";

const authSlice = createSlice({
    name: "authReducer",
    initialState: {
      user: null,
      token: localStorage.getItem("token") || null,
      loading: false,
      error: null,
    },
    reducers: {
      logoutUser: (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem("token");
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { logoutUser } = authSlice.actions;
  export default authSlice.reducer;