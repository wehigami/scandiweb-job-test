import { createSlice } from "@reduxjs/toolkit";

export const currentLinkSlice = createSlice({
  name: "currentLink",
  initialState: {
    currentLink: '',
  },
  reducers: {
    setCurrentLink(state, action) {
      state.currentLink = action.payload;
    },
  },
});

const { actions, reducer } = currentLinkSlice;
export const { setCurrentLink } = actions;
export default reducer;
