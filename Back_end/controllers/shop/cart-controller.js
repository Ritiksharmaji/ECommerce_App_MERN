const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
    try {
      // Destructure userId, productId, and quantity from the request body
      const { userId, productId, quantity } = req.body;
  
      // Validate input data: Ensure userId, productId are provided and quantity is greater than 0
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      // Check if the product exists in the database
      const product = await Product.findById(productId);
  
      // If the product does not exist, return a 404 response
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      // Find the cart associated with the user
      let cart = await Cart.findOne({ userId });
  
      // If no cart exists for the user, create a new cart instance
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      // Check if the product already exists in the cart
      const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      console.log(findCurrentProductIndex, "product current index")
  
      // If the product does not exist in the cart, add it with the specified quantity
      if (findCurrentProductIndex === -1) {
        cart.items.push({ productId, quantity });
      } else {
        // If the product already exists in the cart, increase its quantity
        cart.items[findCurrentProductIndex].quantity += quantity;
      }
  
      // Save the updated cart back to the database
      await cart.save();
  
      // Respond with the updated cart data
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      // Log the error to the console for debugging purposes
      console.log(error);
  
      // Respond with a 500 status code if any server-side error occurs
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };
  
  const fetchCartItems = async (req, res) => {
    try {
      // Extract userId from the request parameters
      const { userId } = req.params;
  
      // Validate if userId is provided
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User id is mandatory!",
        });
      }
  
      // Fetch the cart associated with the given userId
      // Use `populate` to retrieve product details for each item in the cart
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId", // Path to populate: productId in items
        select: "image title price salePrice", // Fields to include in the populated product data
      });
  
      // If no cart is found for the given userId, return a 404 response
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      // Filter out invalid or removed product references from the cart items
      const validItems = cart.items.filter(
        (productItem) => productItem.productId 
        // Ensures the productId exists bease if the admin delete that product at same 
        // time when are adding the product so it should not add.
      );
  
      // If there were invalid items, update the cart to only include valid items
      if (validItems.length < cart.items.length) {
        cart.items = validItems; // Update cart items to include only valid products
        await cart.save(); // Save the updated cart
      }
  
      // Transform the valid items into a more user-friendly structure
      const populateCartItems = validItems.map((item) => ({
        productId: item.productId._id, // Product ID
        image: item.productId.image, // Product image
        title: item.productId.title, // Product title
        price: item.productId.price, // Product price
        salePrice: item.productId.salePrice, // Product sale price (if applicable)
        quantity: item.quantity, // Quantity of the product in the cart
      }));
  
      // Return the cart details in the response, including the transformed items
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc, // Spread other cart details
          items: populateCartItems, // Replace items with the populated data
        },
      });
    } catch (error) {
      // Log any server-side errors for debugging purposes
      console.log(error);
  
      // Respond with a 500 status code in case of an error
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };
  


  const updateCartItemQty = async (req, res) => {
    try {
      // Destructure the required fields from the request body
      const { userId, productId, quantity } = req.body;
  
      // Validate input: Check if all required fields are provided and quantity is greater than 0
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!", // Return a bad request error if validation fails
        });
      }
  
      // Find the cart associated with the given userId
      const cart = await Cart.findOne({ userId });
  
      // If the cart does not exist, return a 404 error
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!", // Notify that no cart was found for the user
        });
      }
  
      // Find the index of the product in the cart items
      const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId // Match the product ID as a string
      );
  
      // If the product is not found in the cart, return a 404 error
      if (findCurrentProductIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Cart item not present!", // Notify that the product is not in the cart
        });
      }
  
      // Update the quantity of the product in the cart
      cart.items[findCurrentProductIndex].quantity = quantity;
  
      // Save the updated cart to the database
      await cart.save();
  
      // Populate the product details in the cart items (e.g., image, title, price)
      await cart.populate({
        path: "items.productId", // Populate the productId field in the items array
        select: "image title price salePrice", // Include specific fields to send to the client
      });
  
      // Transform the cart items into a user-friendly structure
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null, // Include product ID (if valid)
        image: item.productId ? item.productId.image : null, // Include product image
        title: item.productId ? item.productId.title : "Product not found", // Include product title or fallback
        price: item.productId ? item.productId.price : null, // Include product price
        salePrice: item.productId ? item.productId.salePrice : null, // Include product sale price
        quantity: item.quantity, // Include the updated quantity
      }));
  
      // Send a success response with the updated cart data
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc, // Include all cart fields
          items: populateCartItems, // Replace items with the populated and transformed data
        },
      });
    } catch (error) {
      // Log any server-side errors for debugging
      console.log(error);
  
      // Respond with a 500 status code in case of an internal server error
      res.status(500).json({
        success: false,
        message: "Error", // Generic error message
      });
    }
  };
  

  const deleteCartItem = async (req, res) => {
    try {
      // Extract userId and productId from request parameters
      const { userId, productId } = req.params;
  
      // Validate input: Ensure both userId and productId are provided
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!", // Return a bad request error if validation fails
        });
      }
  
      // Find the cart associated with the userId and populate the product details
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId", // Populate productId field in the items array
        select: "image title price salePrice", // Select only specific fields to reduce payload size
      });
  
      // If no cart is found, return a 404 error
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!", // Notify that the cart does not exist for the user
        });
      }
  
      // Filter out the product to be deleted from the cart's items array
      cart.items = cart.items.filter(
        (item) => item.productId._id.toString() !== productId // Compare productId as strings
      );
  
      // Save the updated cart to the database
      await cart.save();
  
      // Re-populate the remaining product details in the cart after deletion
      await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      // Transform the cart items into a user-friendly structure
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null, // Include product ID if valid
        image: item.productId ? item.productId.image : null, // Include product image
        title: item.productId ? item.productId.title : "Product not found", // Include product title or fallback
        price: item.productId ? item.productId.price : null, // Include product price
        salePrice: item.productId ? item.productId.salePrice : null, // Include product sale price
        quantity: item.quantity, // Include the product quantity
      }));
  
      // Send a success response with the updated cart data
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc, // Include all other cart fields
          items: populateCartItems, // Replace items with the transformed data
        },
      });
    } catch (error) {
      // Log any server-side errors for debugging
      console.log(error);
  
      // Respond with a 500 status code in case of an internal server error
      res.status(500).json({
        success: false,
        message: "Error", // Generic error message
      });
    }
  };
  
module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};