import express from "express";
import {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  updateStatus,
  getApprovedRequests,
  getRequestByUserId,
} from "../controllers/requestController.js";
import {
  verifyToken,
  isSoldier,
  isMunicipality,
  isDonor,
} from "../middleware/auth.js";

const router = express.Router();

// Protected routes - all request routes require authentication
router.use(verifyToken);

// Create request - only Soldiers can create requests
router.post("/", isSoldier, createRequest);

// Get all requests - Municipality and Donors can view requests
router.get(
  "/",
  (req, res, next) => {
    if (
      req.user.type === "Municipality" ||
      req.user.type === "Donor" ||
      req.user.type === "Organization" ||
      req.user.type === "Admin"
    ) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  },
  getRequests
);

// Get approved requests - accessible by donors
router.get("/approved", isDonor, getApprovedRequests);

// Get user's requests - accessible by the authenticated user
router.get("/my-requests", getRequestByUserId);

// Get specific request - accessible by the creator, Municipality, and Donors
router.get("/:id", getRequestById);

// Update request status - only Municipality can update status
router.put("/:id/status", isMunicipality, updateStatus);

// Update and delete - only the creator can perform these actions
router.put("/:id", verifyToken, updateRequest);
router.delete("/:id", verifyToken, deleteRequest);

export default router;
