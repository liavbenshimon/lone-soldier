import express from "express";
import {
  getAllResidences,
  getResidenceById,
  createResidence,
  updateResidence,
  deleteResidence,
} from "../controllers/residenceController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get all residences
router.get("/", authenticateToken, getAllResidences);

// Route to get a residence by ID
router.get("/:id", authenticateToken, getResidenceById);

// Route to create a new residence
router.post("/", authenticateToken, createResidence);

// Route to update a residence by ID
router.put("/:id", authenticateToken, updateResidence);

// Route to delete a residence by ID
router.delete("/:id", authenticateToken, deleteResidence);

export default router;
