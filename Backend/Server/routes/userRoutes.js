import express from "express";
import {
  createUser,
  loginUser,
  // getUserByFullName,
  getAllUsers,
  deleteUser,
  editUser,

  getUserById,
  getUserByPIN,
  getCurrentUser,
  getPublicUserProfile
} from "../controllers/userController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/", createUser);

// Protected routes
// Note: Order matters! More specific routes should come before generic ones
router.get("/me", authenticateToken, getCurrentUser);
// router.get(
//   "/pin/:personalIdentificationNumber",
//   authenticateToken,
//   getUserByPIN
// );
// router.get("/:firstName/:lastName", authenticateToken, getUserByFullName);

// Strange Profile✨
router.get("/:id/public", authenticateToken, getPublicUserProfile);
router.get("/:id", authenticateToken, getUserById);
router.get("/", authenticateToken, getAllUsers);
router.delete("/:passport", authenticateToken, deleteUser);
router.put("/:id", authenticateToken, editUser);

export default router;
