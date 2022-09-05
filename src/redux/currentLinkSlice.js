import { createSlice } from "@reduxjs/toolkit";

export const currentLink = createSlice({
    name: 'CurrentLink',
    initialState: {
        currentLink: '',
    },
    reducers: {
        setCurrentLink: (state, action) => {
            state.currentLink = action.payload;
        }
    }
});

const { actions, reducer } = currentLink;
export const { setCurrentLink } = actions;
export default reducer;