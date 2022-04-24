import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, IUser } from "../../types";

const initialState = {
  isAuthenticated: false,
  user: {
    _id: "",
    name: "",
    surname: "",
    email: "",
    avatar: "",
  },
  jwt: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {
      state.isAuthenticated = true;
      state.user._id = action.payload.user._id;
      state.user.name = action.payload.user.name;
      state.user.surname = action.payload.user.surname;
      state.user.email = action.payload.user.email;
      state.user.avatar = action.payload.user.avatar;
      state.jwt = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user._id = "";
      state.user.name = "";
      state.user.surname = "";
      state.user.email = "";
      state.user.avatar = "";
      state.jwt = "";
    },
    updateAccount: (state, action: PayloadAction<IUser>) => {
      state.user._id = action.payload._id;
      state.user.name = action.payload.name;
      state.user.surname = action.payload.surname;
      state.user.email = action.payload.email;
      state.user.avatar = action.payload.avatar;
    },
  },
});

export const { login, logout, updateAccount } = authSlice.actions;

export default authSlice.reducer;
