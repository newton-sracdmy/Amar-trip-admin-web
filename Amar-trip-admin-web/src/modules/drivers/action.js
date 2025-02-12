import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";
//import amrTrip from "../../../services/amrTrip";

export const getUsersData = createAsyncThunk(
  'rides/fetchUsers',
  async (type) => {  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTVkZDAyZTg0MjQyNGYwYjlkZDc4ZiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTczOTM1NzAyOSwiZXhwIjoxNzM5Mzc4NjI5fQ.6lotdgbZA9y-24iK0LgVczrXDz9aSRlWBufuLpM7BYc";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const {
      data: { data },
    } = await amrTrip.get(`/users?type=${type}`, config);
   console.log("users api data=============", data);
    return data;
  }
);
