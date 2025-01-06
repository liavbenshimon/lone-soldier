import express from "express";
import {
  createEatUp,
  getAllEatUps,
  getEatUpById,
  updateEatUp,
  deleteEatUp,
  toggleGuestSubscription,
} from "../controllers/eatupController.js";
import { verifyToken, canCreateEatups, isSoldier } from "../middleware/auth.js";

const router = express.Router();
// Protected routes
router.use(verifyToken);
router.get("/", getAllEatUps);
router.get("/:id", getEatUpById);

// Create EatUp - only Municipality, Donor, or Organization can create
router.post("/", canCreateEatups, createEatUp);

// Subscribe/Unsubscribe to EatUp - only Soldiers can subscribe
router.post("/:id/subscribe", isSoldier, toggleGuestSubscription);

// Update and Delete - only the creator can perform these actions
router.put("/:id", verifyToken, updateEatUp);
router.delete("/:id", verifyToken, deleteEatUp);

export default router;
