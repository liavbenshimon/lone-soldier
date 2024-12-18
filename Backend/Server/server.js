import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config(); // Load environment variables
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

// Import route files
import userRoutes from "./routes/userRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import eatupRoutes from "./routes/eatupRoute.js";
import residenceRoutes from "./routes/residenceRoutes.js";

const app = express();

// Middleware Configuration
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    // credentials: true, // Enable credentials
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes setup
app.use("/users", userRoutes);
app.use('/donation', donationRoutes)
app.use("/eatups", eatupRoutes);
app.use("/residences", residenceRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
