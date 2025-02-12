import { createSlice } from '@reduxjs/toolkit';
import { getRidesData } from './action';

const initialState = {
  rides: [],
  status: 'idle',
  error: '',
  isLoading: false,
  isError: false
};

export const ridesSlice = createSlice({
  name: 'ridesReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRidesData.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getRidesData.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.rides = action.payload;
      })
      .addCase(getRidesData.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
});

export default ridesSlice.reducer;
