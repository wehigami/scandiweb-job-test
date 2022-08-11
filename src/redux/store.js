import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from './currencySlice'
import categoryReducer from './categorySlice'
import productHoverSlice from "./productHoverSlice";
import cartSlice from "./cartSlice";

export default configureStore({
    reducer: {
        activeCurrency: currencyReducer,
        activeCategory: categoryReducer,
        productHover: productHoverSlice,
        addToCart: cartSlice,
    }
});