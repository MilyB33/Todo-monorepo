import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIcon } from "../../types";

interface IState {
  defaultIcons: IIcon[];
}

const initialState: IState = {
  defaultIcons: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDefaultIcons: (state, action: PayloadAction<IIcon[]>) => {
      state.defaultIcons = action.payload;
    },
  },
});

export const { setDefaultIcons } = appSlice.actions;

export default appSlice.reducer;
