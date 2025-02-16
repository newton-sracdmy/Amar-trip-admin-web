import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../../services/amrTrip";

export const getRidesData = createAsyncThunk(
  'rides/fetchRides',
  async ({ page, limit, status, search }, { getState }) => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${getState().authReducer.token}`
      },
      params: {
        page,
        limit,
        ...(status && status !== 'all' && { status }),
        ...(search && { search })
      }
    };

    const {
      data: { data }
    } = await amrTrip.get(`/rides`, config);
    
    return data;
  }
);

export const getRideDataById = createAsyncThunk(
  'rides/fetchRideDataById',
  async (id, { getState }) => {  
   
    const config = {
      headers: {
        Authorization: `Bearer ${getState().authReducer.token}`
      }
    };
    
    const {
      data: { data },
    } = await amrTrip.get(`/rides/${id}`, config);

    return data;
  }
);