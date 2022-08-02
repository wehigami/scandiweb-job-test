import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from './currencySlice'

export default configureStore({
    reducer: {
        activeCurrency: currencyReducer,
    }
});