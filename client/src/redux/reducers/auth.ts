import { createSlice } from "@reduxjs/toolkit";

interface ILogin {
  id: string;
  fullname: string;
  email: string;
  otp_enabled: boolean;
  otp_verified: boolean;
}
const initialState: ILogin = {
  id: "",
  fullname: "",
  email: "",
  otp_enabled: false,
  otp_verified: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase("auth/login/fulfilled", (state, action: any) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.fullname = action.payload.fullname;
        state.otp_enabled = action.payload.otp_enabled;
        state.otp_verified = action.payload.otp_verified;
      })
      .addCase("auth/logout/fulfilled", (state, action: any) => {
        state.id = "";
        state.email = "";
        state.fullname = "";
        state.otp_verified = false;
        state.otp_verified = false;
      })
      .addCase("auth/verify-otp/fulfilled", (state, action: any) => {
        state.otp_verified = action.payload.otp_verified;
      })
      .addCase("auth/enable-otp/fulfilled", (state, action: any) => {
        state.otp_verified = action.payload.otp_verified;
        state.otp_enabled = action.payload.otp_enabled;
      })
      .addCase("auth/disable-otp/fulfilled", (state, action: any) => {
        state.otp_enabled = action.payload.otp_enabled;
      });
  },
});
