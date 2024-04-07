import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        selectedBookIds: [],
    },
    reducers: {
        addSelectedBookId: (state, action) => {
            state.selectedBookIds.push(action.payload);
        },
        removeSelectedBookId: (state, action) => {
            state.selectedBookIds = state.selectedBookIds.filter((id) => id !== action.payload);
        },
        clearSelectedBookIds: (state) => {
            state.selectedBookIds = [];
        },
    },
});

export const { addSelectedBookId, removeSelectedBookId, clearSelectedBookIds } = bookSlice.actions;
export default bookSlice.reducer;
