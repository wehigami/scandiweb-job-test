import { createSlice } from "@reduxjs/toolkit";

let index = (state, action) =>
  state.cart.findIndex((item) => item.id === action.payload);

export const cartSlice = createSlice({
  name: "addToCart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart(state, action) {
      state.cart.push(action.payload); // add to cart
    },
    setCartIncrement(state, action) {
      state.cart[index(state, action)].quantity++; // increment quantity
    },
    setCartDecrement(state, action) {
      state.cart[index(state, action)].quantity--; // decrement quantity
    },
    setCartSplice(state, action) {
      state.cart.splice(index(state, action), 1); // remove item from cart
    },
    setCartItem(state, action) {
      let index = state.cart.findIndex((item) => item.id === action.payload[0]);
      if (state.cart[index]) {
        state.cart[index][action.payload[1]] = action.payload[2];
      }
      //action.payload[0] is the id of the item, action.payload[1] is the id of the value, action.payload[2] is the new value on the item
    },
    setCartAttributes(state, action) {
      let index = state.cart.findIndex((item) => item.id === action.payload[0]);
      if (state.cart[index]) {
        state.cart[index].attributes.forEach((attribute) => {
          for (const [key, value] of Object.entries(attribute)) {
            if (key === action.payload[1] && value !== action.payload[2]) {
              attribute[key] = action.payload[2];
  
            }
          }
        });
      }
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  setCart,
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
  setCartAttributes,
} = actions;
export default reducer;
