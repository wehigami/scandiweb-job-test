import { createSlice } from "@reduxjs/toolkit";

export const currentAttrSlice = createSlice({
  name: "acurrentAttribute",
  initialState: {
    current: '',
  },
  reducers: {
    setCurrentAttr(state, action) {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = currentAttrSlice;
export const { setCurrentAttr } = actions;
export default reducer;
