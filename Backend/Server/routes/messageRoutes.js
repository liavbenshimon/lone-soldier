import express from "express";
import {
  createMessage,
  getMessagesByChannel,
  deleteMessage,
  updateMessage,
} from "../controllers/messageController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// All message routes require authentication
router.use(verifyToken);

// Routes for messages
router.post("/", createMessage);
router.get("/channel/:channelId", getMessagesByChannel);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;
