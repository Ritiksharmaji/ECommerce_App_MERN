// Import necessary functions from @reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import the reducers for different slices
import authReducer from "./auth-slice"; // Auth slice reducer
import adminProductsSlice from "./admin/products-slice"; // Admin products slice reducer
import shopCartSlice from "./shop/cart-slice"; // Shop cart slice reducer
import shopProductsSlice from "./shop/products-slice"; // Shop products slice reducer

// Configure the Redux store by combining all the reducers
const store = configureStore({
    reducer: {
        // Map each slice reducer to a specific key in the state
        auth: authReducer, // Manages authentication-related state
        adminProducts: adminProductsSlice, // Manages admin product state
        shopCart: shopCartSlice, // Manages shopping cart state
        shopProducts: shopProductsSlice, // Manages products available in the shop
    },
});

// Export the configured store so it can be used in the app
export default store;
