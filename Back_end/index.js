require('dotenv').config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routers/auth/auth-routes");
const adminProductsRouter = require("./routers/admin/products-routes");


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
// app.use(cors()); // Enable all the CORS
// to enable particular url 

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json()); // Parse JSON request bodies
  // define the routes for the auth module
  app.use("/api/auth", authRoutes);

  app.use("/api/admin/products", adminProductsRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
