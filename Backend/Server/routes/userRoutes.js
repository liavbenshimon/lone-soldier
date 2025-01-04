import express from "express";
import {
  createUser,
  loginUser,
  // getUserByFullName,
  getAllUsers,
  deleteUser,
  editUser,
  // getUserByPIN,
  getUserById,
} from "../controllers/userController.js";
import authenticateToken from "../middleware/authMiddleware.js"; 

const router = express.Router();

// Routes for user management
router.post("/login", loginUser); // User login and JWT generation
router.post("/", createUser); // Create a new user
// router.get("/:firstName/:lastName", authenticateToken, getUserByFullName); 
router.get("/:id", authenticateToken, getUserById); // Nova rota para buscar usuário por ID
router.get("/", authenticateToken, getAllUsers); // Get all users
// router.get(
//   "/pin/:personalIdentificationNumber",
//   authenticateToken,
//   getUserByPIN
// ); 
router.delete("/:passport", authenticateToken, deleteUser); // Delete a user by passport
router.put("/:id", authenticateToken, editUser);

export default router;
