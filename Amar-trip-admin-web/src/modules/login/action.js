import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";



export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => { 
  try{
  const response = await amrTrip.post(`/login`, userData);
  const { user, token } = response.data;
  localStorage.setItem("token", token)
  return { user, token };
  }
 catch(error){
    return rejectWithValue(error.response?.data?.message || "Login failed!");
}
});
