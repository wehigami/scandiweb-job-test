import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'activeCategory',
    initialState: {
        categoryName: 'all'
    },
    reducers: {
        setActiveCategoryName: (state, action) => {
            state.categoryName = action.payload;
        }
    }
});

const { actions, reducer } = categorySlice;
export const { setActiveCategoryName } = actions;
export default reducer;