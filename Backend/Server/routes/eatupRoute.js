import express from "express";
import {
  createEatUp,
  getAllEatUps,
  getEatUpById,
  updateEatUp,
  deleteEatUp,
  toggleGuestSubscription,
} from "../controllers/eatupController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new EatUp entry
router.post("/", authenticateToken, createEatUp);

// Route to get all EatUp entries
router.get("/", authenticateToken, getAllEatUps);

// Route to get a specific EatUp entry by ID
router.get("/:id", authenticateToken, getEatUpById);

// Route to update a specific EatUp entry by ID
router.put("/:id", authenticateToken, updateEatUp);

// Route to delete a specific EatUp entry by ID
router.delete("/:id", authenticateToken, deleteEatUp);

// Route to toggle guest subscription
router.post(
  "/:id/toggle-subscription",
  authenticateToken,
  toggleGuestSubscription
);

export default router;
