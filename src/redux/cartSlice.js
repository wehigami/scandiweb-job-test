import { createSlice } from "@reduxjs/toolkit";

let index = (state, action) => state.cart.findIndex((item) => item.id === action.payload);

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
    setCartIncrement(state, action) {
      state.cart[index(state, action)].quantity++;
    },
    setCartDecrement(state, action) {
      state.cart[index(state, action)].quantity--;
    },
    setCartSplice(state, action) {
      state.cart.splice(index(state, action), 1);
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
export const { setCart, setCartDecrement, setCartIncrement, setCartPrices, setCartPricesRemove, setCartSplice } = actions;
export default reducer;
