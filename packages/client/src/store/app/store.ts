import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import appReducer from "../slices/appSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
