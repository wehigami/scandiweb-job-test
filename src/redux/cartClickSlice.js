import { createSlice } from "@reduxjs/toolkit";

export const cartClickSlice = createSlice({
  name: "cartClick",
  initialState: {
    cartClicked: false,
  },
  reducers: {
    setCartClick(state) {
      state.cartClicked = !state.cartClicked;
    },
  },
});

const { actions, reducer } = cartClickSlice;
export const { setCartClick } = actions;
export default reducer;
