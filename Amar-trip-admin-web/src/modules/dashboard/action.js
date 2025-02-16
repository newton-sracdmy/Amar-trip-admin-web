import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";


export const getRidesSummary = createAsyncThunk(
  'rides/fetchRidesSummary',
  async (_, { getState }) => {  
    const config = {
      headers: {
        Authorization: `Bearer ${getState().authReducer.token}`
      }
    };
    
   const response = await amrTrip.get(`/RidesSummary`, config);
    return response;
  }
);
