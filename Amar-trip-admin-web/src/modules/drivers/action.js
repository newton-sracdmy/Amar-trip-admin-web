import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";

export const getUsersData = createAsyncThunk(
  'rides/fetchUsers',
  async ({ page, limit, type, isOnline, search, district, upazila,union },{ getState }) => {  
    const config = {
      headers: {
        Authorization: `Bearer ${getState().authReducer.token}`
      },
      params: {
        page,
        type,
        limit,
        ...(isOnline && isOnline !== 'all' && { isOnline }),
        ...(search && { search }),
        district,
        upazila,
        union
      }
    };
    
    const {
      data: { data },
    } = await amrTrip.get(`/users`, config);

    return data;
  }
);

export const getUserDataById = createAsyncThunk(
  'rides/fetchUserDataById',
  async (id, { getState }) => {  
    const config = {
      headers: {
        Authorization: `Bearer ${getState().authReducer.token}`
      }
    };
    
    const {
      data: { data },
    } = await amrTrip.get(`/users/${id}`, config);
    return data;
  }
);

