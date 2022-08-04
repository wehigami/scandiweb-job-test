import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from './currencySlice'
import categoryReducer from './categorySlice'

export default configureStore({
    reducer: {
        activeCurrency: currencyReducer,
        activeCategory: categoryReducer,
    }
});