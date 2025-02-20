import { createAsyncThunk } from "@reduxjs/toolkit";
import amrTrip from "../../services/amrTrip";

export const getPaymentData = createAsyncThunk(
    'rides/fetchPaymentData',
    async ({ page, limit, status, startDate, endDate, search }, { getState }) => {
      
      const config = {
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`
        },
        params: {
          page,
          limit,
          startDate,
          endDate,
          ...(status && status !== 'all' && { status }),
          ...(search && { search })
        }
      };
  
      const {
        data: { data }
      } = await amrTrip.get(`/payments`, config);

      return data;
    }
  );

  export const getPaymentForDownload = createAsyncThunk(
    "rides/fetchPaymentDataForDownload",
    async ({ startDate, endDate }, { getState, rejectWithValue }) => {
      try {
        const token = getState().authReducer?.token;
        if (!token) {
          return rejectWithValue("Unauthorized: No token provided");
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            startDate,
            endDate,
          },
          responseType: "blob",
        };
  

        const response = await amrTrip.get(`/paymentsFilter`, config);
  
        const blob = new Blob([response.data], { type: "text/csv" });
  
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "payments.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
  
        return "Download started"; 
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to download file"
        );
      }
    }
  );