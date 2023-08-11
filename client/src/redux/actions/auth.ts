import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib/api";

export const RegisterAction = createAsyncThunk(
  "auth/register",
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const result = await API.POST("/api/register", data);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const LoginAction = createAsyncThunk(
  "auth/login",
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const result = await API.POST("/api/login", data);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const LogOutAction = createAsyncThunk(
  "auth/logout",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await API.POST("/api/logout", {
        id: id,
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const GenOTPAction = createAsyncThunk(
  "auth/gen-otp",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await API.POST("/api/gen-otp", {
        id: id,
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const VerifyOTPAction = createAsyncThunk(
  "auth/verify-otp",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const result = await API.POST("/api/verify-otp", {
        id: id,
        token: token,
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const ValidateOTPAction = createAsyncThunk(
  "auth/validate-otp",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const result = await API.POST("/api/validate-otp", {
        id: id,
        token: token,
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const DisableOTPAction = createAsyncThunk(
  "auth/disable-otp",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await API.POST("/api/disable-otp", {
        id: id,
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
