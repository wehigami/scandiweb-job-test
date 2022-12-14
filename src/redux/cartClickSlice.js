import { createSlice } from "@reduxjs/toolkit";

export const cartClickSlice = createSlice({
  name: "cartClick",
  initialState: {
    cartClicked: false,
    cartMessage: "",
  },
  reducers: {
    setCartClick(state, action) {
      state.cartClicked = action.payload;
    },
    setCartMessage(state, action) {
      state.cartMessage = action.payload;
    },
  },
});

const { actions, reducer } = cartClickSlice;
export const { setCartClick, setCartMessage } = actions;
export default reducer;
