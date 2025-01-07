import express from "express";
import {
  createSignupRequest,
  getAllSignupRequests,
  updateSignupRequestStatus,
  getSignupRequestById,
} from "../controllers/signupRequestController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public route - anyone can create a signup request
router.post("/", createSignupRequest);

// Protected routes
router.use(verifyToken);

// Admin can view all requests and update their status
router.get("/", getAllSignupRequests);
router.get("/:id", getSignupRequestById);
router.put("/:id/status", updateSignupRequestStatus);

export default router;
