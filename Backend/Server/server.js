import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config(); // Load environment variables
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

// Import route files
import userRoutes from "./routes/userRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import eatupRoutes from "./routes/eatupRoute.js";
import profileRoutes from "./routes/profileRoutes.js"
import residenceRoutes from "./routes/residenceRoutes.js";
const PORT = process.env.PORT || 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware Configuration
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*", // Frontend URL
    // credentials: true, // Enable credentials
  })
);
app.use(express.static("public")); // Serve static files
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
app.use("/api/users", userRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/eatups", eatupRoutes);
app.use("/api/residences", residenceRoutes);
app.use("/api/profile", profileRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
