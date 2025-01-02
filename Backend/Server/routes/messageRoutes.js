import express from "express";
import {
  getChannelMessages,
  createMessage,
} from "../controllers/messageController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// Protected routes - all message operations require authentication
router.use(requireAuth);

// Get all messages for a channel
router.get("/:channelId", getChannelMessages);

// Create/send a message to a channel
router.post("/:channelId", createMessage);

export default router;
