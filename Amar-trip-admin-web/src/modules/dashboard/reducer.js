import { createSlice } from '@reduxjs/toolkit';
import { getRidesSummary } from './action';

const initialState = {
  ridesSummary: [], 
  status: 'idle',
  error: '',
  isLoading: false,
  isError: false,
};

export const ridesSummarySlice = createSlice({
  name: 'ridesSummaryReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRidesSummary.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getRidesSummary.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.ridesSummary = action.payload;
      })
      .addCase(getRidesSummary.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
});

export default ridesSummarySlice.reducer;
