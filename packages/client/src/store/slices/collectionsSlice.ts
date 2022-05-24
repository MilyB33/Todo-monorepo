import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICollection, ITask } from "../../types";
import { RootState } from "../app/store";

interface IState {
  collections: ICollection[];
}

const initialState: IState = {
  collections: [],
};

export const collectionsSlice = createSlice({
  name: "collections",
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
    replaceCollection: (state, action: PayloadAction<ICollection>) => {
      state.collections.map((collection) =>
        collection._id === action.payload._id ? action.payload : collection
      );
    },
    clearCollections: (state) => {
      state.collections = [];
    },
    addTask: (state, action: PayloadAction<ITask>) => {
      state.collections
        .find((collection) => collection._id === action.payload.collectionId)
        ?.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<{ taskId: string; collectionId: string }>) => {
      const collection = state.collections.find(
        (collection) => collection._id === action.payload.collectionId
      );
      if (collection) {
        collection.tasks = collection.tasks.filter((task) => task._id !== action.payload.taskId);
      }
    },
    replaceTask: (state, action: PayloadAction<ITask>) => {
      const collection = state.collections.find(
        (collection) => collection._id === action.payload.collectionId
      );
      if (collection) {
        collection.tasks = collection.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      }
    },
  },
});

export const selectCollection = (state: RootState) => (id: string) => {
  return state.collections.collections.find((collection) => collection._id === id);
};

export const selectFavoriteCollections =
  (state: RootState) =>
  (limit: number = 5) => {
    return state.collections.collections.reduce((acc, collection, _, arr) => {
      if (collection.isFavorite) {
        acc.push(collection);
      }

      if (acc.length !== limit) {
        if (!collection.isFavorite) {
          acc.push(collection);
        }
      }

      return acc;
    }, [] as ICollection[]);
  };

export const selectDashboardCollections = (state: RootState) => {
  return state.collections.collections
    .filter((collection) => collection.tasks.length !== 0)
    .sort((a, b) => {
      return a.tasks[0].date > b.tasks[0].date ? 1 : -1;
    });
};

export const {
  setCollections,
  addCollection,
  removeCollection,
  replaceCollection,
  clearCollections,
  addTask,
  removeTask,
  replaceTask,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
