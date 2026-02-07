import {configureStore} from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import settingsSlice from "./slices/settingsSlice";

export const store = configureStore({
    reducer : {
       auth : authSlice,
       product: productSlice,
       cart: cartSlice,
       order: orderSlice,
       settings:settingsSlice
    }
})