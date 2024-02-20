import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from "./bookmarkSlice";

export const store = configureStore({
	// localStorage.setItem("items", JSON.stringify(state.items))
	reducer: {
		bookmarks: bookmarksReducer,
	},
});
