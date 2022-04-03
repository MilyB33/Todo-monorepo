import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    blank: function (state, action) {
      if (state == null) state = [];
      return state;
    },
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
