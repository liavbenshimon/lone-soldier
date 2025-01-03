import express from "express";
import {
  getChannelMessages,
  createMessage,
} from "../controllers/messageController.js";

const router = express.Router();

// Get messages for a channel
router.get("/:channelId", getChannelMessages);

// Send a new message
router.post("/:channelId", createMessage);

export default router;
