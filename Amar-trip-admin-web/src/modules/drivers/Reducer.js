import { createSlice } from '@reduxjs/toolkit';
import { getUsersData } from './action';

const initialState = {
  users: [], 
  status: 'idle',
  error: '',
  isLoading: false,
  isError: false,
};

export const usersSlice = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersData.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;
