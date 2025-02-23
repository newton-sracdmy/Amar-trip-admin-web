import { createSlice } from '@reduxjs/toolkit';
import { getPaymentData, getPaymentDataById } from './action';


const initialState = {
  paymentsData: [], 
  paymentById: [],
  paymentsStatus: 'idle', 
  paymentByIdStatus: 'idle',
  paymentsError: '',
  paymentByIdError: '',
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
        state.paymentsStatus = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getPaymentData.fulfilled, (state, action) => {
        state.paymentsStatus = 'success';
        state.isLoading = false;
        state.paymentsData = action.payload;
      })
      .addCase(getPaymentData.rejected, (state, action) => {
        state.paymentsStatus = 'error';
        state.isLoading = false;
        state.isError = true;
        state.paymentsError = action.error.message;
      })
     .addCase(getPaymentDataById.pending, (state) => {
        state.paymentByIdStatus = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getPaymentDataById.fulfilled, (state, action) => {
        state.paymentByIdStatus = 'success';
        state.isLoading = false;
        state.paymentById = action.payload;
      })
      .addCase(getPaymentDataById.rejected, (state, action) => {
        state.paymentByIdStatus = 'error';
        state.isLoading = false;
        state.isError = true;
        state.paymentByIdError = action.error.message;
      });
  }
});

export default paymentsSlice.reducer;
