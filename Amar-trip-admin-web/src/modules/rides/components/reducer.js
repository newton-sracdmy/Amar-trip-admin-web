import { createSlice } from '@reduxjs/toolkit';
import { getRidesData, getRideDataById } from './action';

const initialState = {
  rides: [],
  rideDataById: [],
  ridesStatus: 'idle', 
  rideDataByIdStatus: 'idle',
  ridesError: '',
  rideDataByIdError: '',
  isLoading: false,
  isError: false,
};

export const ridesSlice = createSlice({
  name: 'ridesReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRidesData.pending, (state) => {
        state.ridesStatus = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getRidesData.fulfilled, (state, action) => {
        state.ridesStatus = 'success';
        state.isLoading = false;
        state.rides = action.payload;
      })
      .addCase(getRidesData.rejected, (state, action) => {
        state.ridesStatus = 'error';
        state.isLoading = false;
        state.isError = true;
        state.ridesError = action.error.message;
      })
      .addCase(getRideDataById.pending, (state) => {
        state.rideDataByIdStatus = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getRideDataById.fulfilled, (state, action) => {
        state.rideDataByIdStatus = 'success';
        state.isLoading = false;
        state.rideDataById = action.payload;
      })
      .addCase(getRideDataById.rejected, (state, action) => {
        state.rideDataByIdStatus = 'error';
        state.isLoading = false;
        state.isError = true;
        state.rideDataByIdError = action.error.message;
      });
  }
});

export default ridesSlice.reducer;
