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
    setCartItem(state, action) {
      state.cart[index(state, action)].action.payload[0] = action.payload[1];
    },
  },
});

const { actions, reducer } = cartSlice;
export const { setCart, setCartDecrement, setCartIncrement, setCartSplice, setCartItem } = actions;
export default reducer;
