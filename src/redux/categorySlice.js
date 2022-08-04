import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'activeCategory',
    initialState: {
        name: 'All'
    },
    reducers: {
        setActivename: (state, action) => {
            state.category = action.payload;
        }
    }
});

const { actions, reducer } = categorySlice;
export const { setActiveCategory } = actions;
export default reducer;