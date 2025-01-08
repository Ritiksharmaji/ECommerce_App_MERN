require('dotenv').config(); // Load environment variables from the .env file (e.g., MONGO_URI, PORT)
const express = require("express"); // Import the Express framework
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection and schema management
const cookieParser = require("cookie-parser"); // Middleware to parse cookies in HTTP requests
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)

// Import route files for authentication, admin product management, shop products, and cart
const authRoutes = require("./routers/auth/auth-routes");
const adminProductsRouter = require("./routers/admin/products-routes");
const shopProductsRouter = require("./routers/shop/products-routes");
const shopCartRouter = require("./routers/shop/cart-routes");

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(process.env.MONGO_URI) // The MongoDB connection string is fetched from the environment variables
  .then(() => console.log("MongoDB connected")) // Log success message on successful connection
  .catch((error) => console.log(error)); // Log error if connection fails

const app = express(); // Initialize the Express app
const PORT = process.env.PORT || 5000; // Set the server's port from environment variables or use 5000 as default

// Middleware
// Enable CORS (Cross-Origin Resource Sharing) to allow requests from specific origins
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests only from this origin (frontend development server)
    methods: ["GET", "POST", "DELETE", "PUT"], // Specify allowed HTTP methods
    allowedHeaders: [
      "Content-Type", // Allow Content-Type header for JSON data
      "Authorization", // Allow Authorization header for authentication
      "Cache-Control", // Allow Cache-Control header for caching
      "Expires",       // Allow Expires header for caching
      "Pragma",        // Allow Pragma header for caching
    ],
    credentials: true, // Allow cookies to be included in CORS requests
  })
);

// Middleware to parse cookies in requests
app.use(cookieParser());

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Define routes for authentication
// All routes in authRoutes will be accessible under the /api/auth path
app.use("/api/auth", authRoutes);

// Define routes for admin product management
// All routes in adminProductsRouter will be accessible under the /api/admin/products path
app.use("/api/admin/products", adminProductsRouter);

// Define routes for shop product management
// All routes in shopProductsRouter will be accessible under the /api/shop/products path
app.use("/api/shop/products", shopProductsRouter);

// Define routes for cart management
// All routes in shopCartRouter will be accessible under the /api/shop/cart path
app.use("/api/shop/cart", shopCartRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log a message indicating the server is running
});
