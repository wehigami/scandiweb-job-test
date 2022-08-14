import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "addToCart",
  initialState: {
    cart: [],
    cartPrices: 0,
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
      state.cartPrices += parseFloat(action.payload);
    },
    setCartPricesRemove(state, action) {
      // let index = state.cartPrices.indexOf(parseFloat(action.payload));
      // if (index !== -1) {
      //   state.cartPrices.splice(index, 1);
      // }
      state.cartPrices -= parseFloat(action.payload);
    },
  },
});

const { actions, reducer } = cartSlice;
export const { setCart, setCartDecrement, setCartPrices, setCartPricesRemove } = actions;
export default reducer;
