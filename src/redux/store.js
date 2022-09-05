import currencyReducer from './currencySlice'
import productHoverReducer from "./productHoverSlice";
import cartReducer from "./cartSlice";
import cartClickReducer from "./cartClickSlice";
import dummyCartReducer from './dummyCartSlice';
import currentLinkReducer from './currentLinkSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
}



export const store = configureStore({
    reducer: {
        activeCurrency: persistReducer(persistConfig, currencyReducer),
        productHover: productHoverReducer,
        cart: persistReducer(persistConfig, cartReducer),
        cartClick: cartClickReducer,
        dummyCart: dummyCartReducer,
        currentLink: currentLinkReducer,
    },
    middleware: [thunk]
});

export const persistor = persistStore(store);