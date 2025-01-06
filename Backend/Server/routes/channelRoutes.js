import express from "express";
import {
  createChannel,
  deleteChannel,
  closeChannel,
  addMembers,
  getAllChannels,
  addMember,
} from "../controllers/channelController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Protected routes
router.use(verifyToken);

// All routes are protected and accessible by admin
router.get("/", getAllChannels);
router.post("/", createChannel);
router.delete("/:id", deleteChannel);
router.put("/:id/close", closeChannel);
router.put("/:id/members", addMembers);
router.put("/:id/members/:userId", addMember);

export default router;
