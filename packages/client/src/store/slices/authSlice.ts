import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin } from "../../types";

const initialState = {
  isAuthenticated: false,
  user: {
    _id: "",
    username: "",
    email: "",
  },
  jwt: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {
      state.isAuthenticated = true;
      state.user._id = action.payload._id;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.jwt = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user._id = "";
      state.user.username = "";
      state.user.email = "";
      state.jwt = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
