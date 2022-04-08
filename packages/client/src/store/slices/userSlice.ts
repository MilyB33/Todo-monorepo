import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICollection } from "../../types";

interface IState {
  collections: ICollection[];
}

const initialState: IState = {
  collections: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<ICollection[]>) => {
      state.collections = action.payload;
    },
    addCollection: (state, action: PayloadAction<ICollection>) => {
      state.collections.push(action.payload);
    },
    removeCollection: (state, action: PayloadAction<string>) => {
      state.collections = state.collections.filter(
        (collection) => collection._id !== action.payload
      );
    },
    clearCollections: (state) => {
      state.collections = [];
    },
  },
});

export const { setCollections, addCollection, removeCollection, clearCollections } =
  userSlice.actions;

export default userSlice.reducer;
