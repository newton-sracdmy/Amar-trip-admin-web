
import { createAsyncThunk } from '@reduxjs/toolkit';
import amrTrip from '../../services/amrTrip';

export const fetchDistricts = createAsyncThunk(
  'location/fetchDistricts',
  async (_, { getState }) => {
    const config = {
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`
        }
      };
      const {
        data: { data },
      } = await amrTrip.get('locations?type=district',config);
      return data;
   
  }
);

export const fetchUpazilas = createAsyncThunk(
  'location/fetchUpazilas',
  async (districtId, { getState }) => {
    const config = {
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`
        }
      };
      const {
        data: { data },
      } = await amrTrip.get(`/locations?type=upazila&parent=${districtId}`,config);
      return data;
   
  }
);

export const fetchUnions = createAsyncThunk(
  'location/fetchUnions',
  async (upazilaId, { getState }) => {
    const config = {
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`
        }
      };
      const {
        data: { data },
      } = await amrTrip.get(`/locations?type=union&parent=${upazilaId}`, config );
      return data;
    
  }
);

