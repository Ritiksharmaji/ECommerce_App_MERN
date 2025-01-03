import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopProductsSlice from "./shop/products-slice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        
        shopCart: shopCartSlice,
        shopProducts: shopProductsSlice,
    },
});

export default store;