import { createSlice } from '@reduxjs/toolkit';
import { getUserDataById, getUsersData } from './action';

const initialState = {
  users: [], 
  userDataById: [],
  userStatus: 'idle',
  userDataByIdStatus: 'idle',
  usersError: '',
  userDataByIdError: '',
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
        state.userStatus = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.userStatus = 'success';
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersData.rejected, (state, action) => {
        state.userStatus = 'error';
        state.isLoading = false;
        state.isError = true;
        state.usersError = action.error.message;
      })
      .addCase(getUserDataById.pending, (state) => {
        state.userDataByIdStatus = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUserDataById.fulfilled, (state, action) => {
        state.userDataByIdStatus = 'success';
        state.isLoading = false;
        state.userDataById = action.payload;
      })
      .addCase(getUserDataById.rejected, (state, action) => {
        state.userDataByIdStatus = 'error';
        state.isLoading = false;
        state.isError = true;
        state.userDataByIdError = action.error.message;
      });
  }
});

export default usersSlice.reducer;
