import { createSlice } from "@reduxjs/toolkit";

interface ILogin {
  id: string;
  fullname: string;
  email: string;
  otp_enabled: boolean;
  otp_validated: boolean;
}
const initialState: ILogin = {
  id: "",
  fullname: "",
  email: "",
  otp_enabled: false,
  otp_validated: false,
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
        state.otp_validated = action.payload.otp_validated;
      })

      .addCase("auth/verify-otp/fulfilled", (state, action: any) => {
        state.otp_enabled = action.payload.otp_enabled;
      })
      .addCase("auth/validate-otp/fulfilled", (state, action: any) => {
        state.otp_validated = action.payload.otp_validated;
      })
      .addCase("auth/disable-otp/fulfilled", (state, action: any) => {
        state.otp_enabled = action.payload.otp_enabled;
      });
  },
});
