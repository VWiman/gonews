import { createSlice } from "@reduxjs/toolkit";

export const bookmarksSlice = createSlice({
	name: "bookmarks",
	initialState: { list: [] }, // State is a list of news articles (objects)
	reducers: {
		// action.payload is a news article (object)
		toggleBookmark: (state, action) => {
			// Find the index of the payload if it exists in the bookmarks list, else return -1
			const index = state.list.findIndex((article) => article.article_id === action.payload.article_id);
	
			if (index !== -1) {
				// If the article is found, remove from bookmarks
				state.list.splice(index, 1);
				console.log("Bookmark removed.");
			} else {
				// If the article is not found, add to bookmarks
				state.list.push(action.payload);
				console.log("Bookmark added.");
			}
		},
	},
});

export const { toggleBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
