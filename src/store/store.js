import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from "./bookmarkSlice";
import darkModeReducer from "./darkModeSlice";

export const store = configureStore({
  // localStorage.setItem("items", JSON.stringify(state.items))
  reducer: {
    bookmarks: bookmarksReducer,
    darkMode: darkModeReducer,
  },
});
