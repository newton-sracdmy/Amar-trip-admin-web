import { createSlice } from "@reduxjs/toolkit";
import { fetchDistricts, fetchUnions, fetchUpazilas } from "./actions";

const initialState = {
    status: 'idle',
    error: '',
    isLoading: false,
    isError: false,
    districts: {
      data: [],
      loading: false,
      error: null
    },
    upazilas: {
      data: [],
      loading: false,
      error: null
    },
    unions: {
      data: [],
      loading: false,
      error: null
    }
  };

const locationSlice = createSlice({
    name: 'locationReducer',
    initialState,
    reducers: {
      clearUpazilas: (state) => {
        state.upazilas.data = [];
        state.unions.data = [];
      },
      clearUnions: (state) => {
        state.unions.data = [];
      }
    },
    extraReducers: (builder) => {
      // Districts
      builder
        .addCase(fetchDistricts.pending, (state) => {
          state.districts.loading = true;
          state.isLoading = true;
          state.status = 'loading';
          state.error = '';
          state.isError = false;
        })
        .addCase(fetchDistricts.fulfilled, (state, action) => {
          state.districts.data = action.payload;
          state.districts.loading = false;
          state.districts.error = null;
          state.isLoading = false;
          state.status = 'succeeded';
          state.error = '';
          state.isError = false;
        })
        .addCase(fetchDistricts.rejected, (state, action) => {
          state.districts.loading = false;
          state.districts.error = action.payload;
          state.isLoading = false;
          state.status = 'failed';
          state.error = action.payload;
          state.isError = true;
        })
  
      // Upazilas
        .addCase(fetchUpazilas.pending, (state) => {
          state.upazilas.loading = true;
          state.isLoading = true;
          state.status = 'loading';
          state.error = '';
          state.isError = false;
        })
        .addCase(fetchUpazilas.fulfilled, (state, action) => {
          state.upazilas.data = action.payload;
          state.upazilas.loading = false;
          state.upazilas.error = null;
          state.isLoading = false;
          state.status = 'succeeded';
          state.error = '';
          state.isError = false;
        })
        .addCase(fetchUpazilas.rejected, (state, action) => {
          state.upazilas.loading = false;
          state.upazilas.error = action.payload;
          state.isLoading = false;
          state.status = 'failed';
          state.error = action.payload;
          state.isError = true;
        })
  
      // Unions
        .addCase(fetchUnions.pending, (state) => {
          state.unions.loading = true;
          state.isLoading = true;
          state.status = 'loading';
          state.error = '';
          state.isError = false;
        })
        .addCase(fetchUnions.fulfilled, (state, action) => {
          state.unions.data = action.payload;
          state.unions.loading = false;
          state.unions.error = null;
          state.isLoading = false;
          state.status = 'succeeded';
          state.error = '';
          state.isError = false;
        })
        .addCase(fetchUnions.rejected, (state, action) => {
          state.unions.loading = false;
          state.unions.error = action.payload;
          state.isLoading = false;
          state.status = 'failed';
          state.error = action.payload;
          state.isError = true;
        });
    }
  });
  
  export const { clearUpazilas, clearUnions } = locationSlice.actions;
  export default locationSlice.reducer;