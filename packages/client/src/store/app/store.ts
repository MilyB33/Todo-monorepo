import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import appReducer from "../slices/appSlice";
import collectionsReducer from "../slices/collectionsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    collections: collectionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
