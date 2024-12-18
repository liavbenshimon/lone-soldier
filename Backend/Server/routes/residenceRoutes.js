import express from "express";
import {
  getAllResidences,
  getResidenceById,
  createResidence,
  updateResidence,
  deleteResidence,
} from "../controllers/residenceController.js";

const router = express.Router();

// Route to get all residences
router.get("/", getAllResidences);

// Route to get a residence by ID
router.get("/:id", getResidenceById);

// Route to create a new residence
router.post("/", createResidence);

// Route to update a residence by ID
router.put("/:id", updateResidence);

// Route to delete a residence by ID
router.delete("/:id", deleteResidence);

export default router;
