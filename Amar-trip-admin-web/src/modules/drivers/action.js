import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";

export const getUsersData = createAsyncThunk(
  'rides/fetchUsers',
  async ({ page, limit, type, isOnline, search }) => {  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTVkZDAyZTg0MjQyNGYwYjlkZDc4ZiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTczOTU5OTU3MCwiZXhwIjoxNzM5NjMxOTcwfQ.mmbh5XCjacVe9DaoW9hWisiL5-9VM9xPAxjpwOK5SQw";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        type,
        limit,
        ...(isOnline && isOnline !== 'all' && { isOnline }),
        ...(search && { search })
      }
    };
    
    const {
      data: { data },
    } = await amrTrip.get(`/users?type=${type}`, config);

    return data;
  }
);
