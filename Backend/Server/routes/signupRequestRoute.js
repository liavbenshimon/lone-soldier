import express from "express";
import {
  createSignupRequest,
  getAllSignupRequests,
  getSignupRequestById,
  updateSignupRequestStatus,
  deleteSignupRequest,
  getSignupRequestByEmail,
} from "../controllers/signupRequestController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// Public routes
router.post("/", createSignupRequest);
router.get("/by-email/:email", getSignupRequestByEmail);

// Protected routes - require admin authentication
router.use(requireAuth);
router.get("/", getAllSignupRequests);
router.get("/:id", getSignupRequestById);
router.patch("/:id/status", updateSignupRequestStatus);
router.delete("/:id", deleteSignupRequest);

export default router;
