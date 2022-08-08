import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from './currencySlice'
import categoryReducer from './categorySlice'
import productHoverSlice from "./productHoverSlice";

export default configureStore({
    reducer: {
        activeCurrency: currencyReducer,
        activeCategory: categoryReducer,
        productHover: productHoverSlice,
    }
});