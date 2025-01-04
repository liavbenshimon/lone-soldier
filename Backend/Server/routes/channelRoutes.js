import express from "express";
import {
  createChannel,
  deleteChannel,
  closeChannel,
  addMembers,
  getAllChannels,
  addMember,
} from "../controllers/channelController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

// Protected routes
router.use(requireAuth);

// Regular user routes
router.get("/", getAllChannels);

// Admin-only routes
router.post("/", requireAdmin, createChannel);
router.delete("/:id", requireAdmin, deleteChannel);
router.put("/:id/close", requireAdmin, closeChannel);
router.put("/:id/members", requireAdmin, addMembers);
router.put("/:id/members/:userId", requireAdmin, addMember);

export default router;
