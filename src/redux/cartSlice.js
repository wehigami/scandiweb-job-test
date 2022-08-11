import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "addToCart",
  initialState: [],
  reducers: {
    setCart(state, action) {
      state.push(action.payload);
    },
  },
});

const { actions, reducer } = cartSlice;
export const { setCart } = actions;
export default reducer;
