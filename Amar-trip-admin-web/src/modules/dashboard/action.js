import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";


export const getRidesSummary = createAsyncThunk(
  'rides/fetchRidesSummary',
  async () => {  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTVkZDAyZTg0MjQyNGYwYjlkZDc4ZiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTczOTUxMzU5NCwiZXhwIjoxNzM5NTM1MTk0fQ.bL-GPnL45_x21OEEon73VpJRYmFwRVofKJFSfzIDKyY";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
   const response = await amrTrip.get(`/RidesSummary`, config);
    return response;
  }
);
