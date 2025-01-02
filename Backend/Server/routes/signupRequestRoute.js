import express from "express";
import {
  createSignupRequest,
  getAllSignupRequests,
  getSignupRequestById,
  updateSignupRequestStatus,
  deleteSignupRequest,
  getSignupRequestByEmail,
} from "../controllers/signupRequestController.js";
import authenticateToken from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
const router = express.Router();

// Public routes
router.post("/", createSignupRequest);
router.get("/by-email/:email", getSignupRequestByEmail);

// Protected routes - require admin authentication
router.use(authenticateToken);
router.use(requireAdmin);
router.get("/", getAllSignupRequests);
router.get("/:id", getSignupRequestById);
router.put("/:id/status", updateSignupRequestStatus);
router.delete("/:id", deleteSignupRequest);

export default router;
