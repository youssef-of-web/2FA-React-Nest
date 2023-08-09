import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth";

export default combineReducers({
  auth: AuthSlice.reducer,
});
