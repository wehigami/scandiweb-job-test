import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from './currencySlice'
import categoryReducer from './categorySlice'
import productHoverSlice from "./productHoverSlice";
import cartSlice from "./cartSlice";
import cartClickSlice from "./cartClickSlice";

export default configureStore({
    reducer: {
        activeCurrency: currencyReducer,
        activeCategory: categoryReducer,
        productHover: productHoverSlice,
        addToCart: cartSlice,
        cartClick: cartClickSlice
    }
});