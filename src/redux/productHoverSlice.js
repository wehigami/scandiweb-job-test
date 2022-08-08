import { createSlice } from "@reduxjs/toolkit";

export const productHoverSlice = createSlice({
    name: 'productHover',
    initialState: {
        hover: false
    },
    reducers: {
        setProductHover: (state, action) => {
            state.hover = action.payload;
        }
    }
});

const { actions, reducer } = productHoverSlice;
export const { setProductHover } = actions;
export default reducer;