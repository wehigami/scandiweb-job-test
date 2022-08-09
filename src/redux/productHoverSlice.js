import { createSlice } from "@reduxjs/toolkit";

export const productHoverSlice = createSlice({
    name: 'productHover',
    initialState: {
        hover: false,
        productId: null
    },
    reducers: {
        setProductHover: (state, action) => {
            state.hover = action.payload[0];
            state.productId = action.payload[1];
        }
    }
});

const { actions, reducer } = productHoverSlice;
export const { setProductHover } = actions;
export default reducer;