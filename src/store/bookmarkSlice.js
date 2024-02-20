import { createSlice } from "@reduxjs/toolkit";

export const bookmarksSlice = createSlice({
	name: "bookmarks",
	initialState: [],

	reducers: {
        toggleBookmark: (state, action) => {
            
        },
	},
});

// localStorage.setItem("items", JSON.stringify(state.items))

export const { articlesToState } = articlesSlice.actions;
export default articlesSlice.reducer;
