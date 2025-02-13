import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";
//import amrTrip from "../../../services/amrTrip";

export const getUsersData = createAsyncThunk(
  'rides/fetchUsers',
  async (type) => {  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTVkZDAyZTg0MjQyNGYwYjlkZDc4ZiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTczOTQyODAyOCwiZXhwIjoxNzM5NDQ5NjI4fQ.t4hNUhvWJmUNlptE5oodBAOBhKAlXnYfyWEZjIOH424";
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
