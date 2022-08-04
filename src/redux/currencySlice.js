import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
    name: 'activeCurrency',
    initialState: {
        label: 'USD',
        symbol: '$'
    },
    reducers: {
        setActiveCurrency: (state, action) => {
            state.symbol = action.payload[0];
            state.label = action.payload[1];
        }
    }
});

const { actions, reducer } = currencySlice;
export const { setActiveCurrency } = actions;
export default reducer;