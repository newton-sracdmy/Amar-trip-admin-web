import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../../services/amrTrip";

export const getRidesData = createAsyncThunk(
  'rides/fetchRides',
  async ({ page, limit, status, search }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTVkZDAyZTg0MjQyNGYwYjlkZDc4ZiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTczOTU5OTU3MCwiZXhwIjoxNzM5NjMxOTcwfQ.mmbh5XCjacVe9DaoW9hWisiL5-9VM9xPAxjpwOK5SQw";
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
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
  async (id) => {  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTVkZDAyZTg0MjQyNGYwYjlkZDc4ZiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTczOTU5OTU3MCwiZXhwIjoxNzM5NjMxOTcwfQ.mmbh5XCjacVe9DaoW9hWisiL5-9VM9xPAxjpwOK5SQw";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const {
      data: { data },
    } = await amrTrip.get(`/rides/${id}`, config);

    return data;
  }
);