import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "addToCart",
  initialState: {
    cart: [],
    cartPrices: [],
  },
  reducers: {
    setCart(state, action) {
      state.cart.push(action.payload);
    },
    setCartDecrement(state, action) {
      let index = state.cart.indexOf(action.payload);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    setCartPrices(state, action) {
      state.cartPrices.push(action.payload);
    },
  },
});

const { actions, reducer } = cartSlice;
export const { setCart, setCartDecrement, setCartPrices } = actions;
export default reducer;
