const express = require("express"); // Import the Express framework for building APIs

// Import the cart-related controller functions
const {
  addToCart,          // Function to handle adding items to the cart
  fetchCartItems,     // Function to fetch all items in the user's cart
  deleteCartItem,     // Function to delete a specific item from the cart
  updateCartItemQty,  // Function to update the quantity of an item in the cart
} = require("../../controllers/shop/cart-controller");

const router = express.Router(); // Create a new instance of the Express router

// Define the route for adding an item to the cart
// HTTP Method: POST
// Path: /add
// Controller: addToCart
router.post("/add", addToCart);

// Define the route for fetching all items in a user's cart
// HTTP Method: GET
// Path: /get/:userId
// Controller: fetchCartItems
// Example: /get/123456 (where 123456 is the user's ID)
router.get("/get/:userId", fetchCartItems);

// Define the route for updating the quantity of an item in the cart
// HTTP Method: PUT
// Path: /update-cart
// Controller: updateCartItemQty
router.put("/update-cart", updateCartItemQty);

// Define the route for deleting an item from the cart
// HTTP Method: DELETE
// Path: /:userId/:productId
// Controller: deleteCartItem
// Example: /123456/78910 (where 123456 is the user's ID and 78910 is the product ID)
router.delete("/:userId/:productId", deleteCartItem);

// Export the router so it can be used in other parts of the application
module.exports = router;
