import express from "express";
import {
  signup,
  login,
  getUserByDisplayName,
  getAllUsers,
  getUserProfile,
  getUserProfileByUsername,
  searchUsers,
} from "../controllers/userController.js";
import { body } from "express-validator";
import { authenticateToken } from "../middleware/authMiddleware.js"; // או הנתיב שבו הפונקציה נמצאת

const router = express.Router();

router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  signup
);

router.post("/login", login);

router.get("/name/:displayName", getUserByDisplayName);

router.get("/", getAllUsers);

router.get("/me", authenticateToken, getUserProfile);

router.get("/profile/:username", getUserProfileByUsername);

router.get("/search", searchUsers);

export default router;
