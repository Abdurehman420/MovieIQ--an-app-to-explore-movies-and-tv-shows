import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./homeslice";
import { favoritesSlice } from "./FavoritesSlice";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./localStorage";

const persistedState = loadStateFromLocalStorage();
const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat((store) => (next) => (action) => {
      next(action);
      saveStateToLocalStorage(store.getState());
    });
  },
});

export default store;
