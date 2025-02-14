import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";
//import amrTrip from "../../../services/amrTrip";

export const getUsersData = createAsyncThunk(
  'rides/fetchUsers',
  async (type) => {  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTVkZDAyZTg0MjQyNGYwYjlkZDc4ZiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTczOTUxMzU5NCwiZXhwIjoxNzM5NTM1MTk0fQ.bL-GPnL45_x21OEEon73VpJRYmFwRVofKJFSfzIDKyY";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const {
      data: { data },
    } = await amrTrip.get(`/users?type=${type}`, config);
    return data;
  }
);
