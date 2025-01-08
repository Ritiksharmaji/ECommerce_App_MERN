const mongoose = require("mongoose");

// Define the schema for the Cart collection
const CartSchema = new mongoose.Schema(
  {
    // Reference to the user who owns the cart
    userId: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId to reference a specific user
      ref: "User", // Refers to the 'User' collection in the database
      required: true, // This field is mandatory
    },
    // Array of items added to the cart
    items: [
      {
        // Reference to the product added to the cart
        productId: {
          type: mongoose.Schema.Types.ObjectId, // ObjectId to reference a specific product
          ref: "Product", // Refers to the 'Product' collection in the database
          required: true, // This field is mandatory
        },
        // Quantity of the product in the cart
        quantity: {
          type: Number, // Specifies that this field must be a number
          required: true, // This field is mandatory
          min: 1, // Minimum value is 1 (cannot add less than 1 product)
        },
      },
    ],
  },
  {
    // Enables automatic tracking of when the cart is created or updated
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

// Export the Cart model to use it in other parts of the application
module.exports = mongoose.model("Cart", CartSchema);
