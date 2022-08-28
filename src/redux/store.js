import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from './currencySlice'
import categoryReducer from './categorySlice'
import productHoverReducer from "./productHoverSlice";
import cartReducer from "./cartSlice";
import cartClickReducer from "./cartClickSlice";
import dummyCartReducer from './dummyCartSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
}



export const store = configureStore({
    reducer: {
        activeCurrency: persistReducer(persistConfig, currencyReducer),
        activeCategory: categoryReducer,
        productHover: productHoverReducer,
        cart: persistReducer(persistConfig, cartReducer),
        cartClick: cartClickReducer,
        dummyCart: dummyCartReducer,
    },
    middleware: [thunk]
});

export const persistor = persistStore(store);