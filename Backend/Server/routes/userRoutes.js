import express from "express";
import {
  loginUser,
  createUser,
  getUserById,
  editUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
} from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/register", createUser);

// Protected routes
router.use(verifyToken);

// Current user route
router.get("/me", getCurrentUser);

// Admin only routes
router.get("/", isAdmin, getAllUsers);

// User specific routes - users can only access their own data
router.get("/:id", getUserById);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
