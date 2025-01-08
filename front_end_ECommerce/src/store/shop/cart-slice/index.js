import axios from "axios"; // Import Axios for making HTTP requests
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Import Redux Toolkit utilities

// Initial state for the cart slice
const initialState = {
  cartItems: [], // Stores the items in the cart
  isLoading: false, // Indicates whether a cart operation is in progress
};

// Thunk to add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart", // Action type for Redux
  async ({ userId, productId, quantity }) => {
    // API call to add an item to the cart
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add", // API endpoint
      {
        userId, // User ID to identify the user's cart
        productId, // Product ID of the item being added
        quantity, // Quantity of the product being added
      }
    );

    return response.data; // Return the response data as the payload for the Redux action
  }
);

// Thunk to fetch all cart items for a user
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems", // Action type for Redux
  async (userId) => {
    // API call to fetch the cart items for a user
    const response = await axios.get(
      `http://localhost:5000/api/shop/cart/get/${userId}` // API endpoint with the user ID
    );

    return response.data; // Return the response data as the payload for the Redux action
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );

    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);



// Create a Redux slice for managing the shopping cart state
const shoppingCartSlice = createSlice({
  name: "shoppingCart", // Name of the slice, used to identify actions
  initialState, // Initial state for the shopping cart (defined earlier)
  reducers: {}, // No additional reducers defined here, all logic is in `extraReducers`

  // Handle async actions (thunks) using `extraReducers`
  extraReducers: (builder) => {
    // Handle addToCart thunk
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true; // Set loading state to true while the API call is in progress
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.cartItems = action.payload.data; // Update cart items with the payload from the API
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false; // Reset loading state
        state.cartItems = []; // Clear cart items if the API call fails
      });

    // Handle fetchCartItems thunk
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true; // Set loading state to true
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.cartItems = action.payload.data; // Populate cart items with fetched data
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false; // Reset loading state
        state.cartItems = []; // Clear cart items if fetching fails
      });

    // Handle updateCartQuantity thunk
    builder
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true; // Set loading state to true
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.cartItems = action.payload.data; // Update cart items with new quantities
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false; // Reset loading state
        state.cartItems = []; // Clear cart items if the update fails
      });

    // Handle deleteCartItem thunk
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true; // Set loading state to true
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.cartItems = action.payload.data; // Update cart items after deletion
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false; // Reset loading state
        state.cartItems = []; // Clear cart items if deletion fails
      });
  },
});

// Export the reducer to be used in the store configuration
export default shoppingCartSlice.reducer;
