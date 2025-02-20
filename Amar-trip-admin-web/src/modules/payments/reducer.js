import { createSlice } from '@reduxjs/toolkit';
import { getPaymentData } from './action';


const initialState = {
  paymentsData: [], 
  status: 'idle',
  error: '',
  isLoading: false,
  isError: false,
};

export const paymentsSlice = createSlice({
  name: 'paymentsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentData.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getPaymentData.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.paymentsData = action.payload;
      })
      .addCase(getPaymentData.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
});

export default paymentsSlice.reducer;
