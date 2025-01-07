import express from "express";
import {
  getAllResidences,
  getResidenceById,
  createResidence,
  updateResidence,
  deleteResidence,
} from "../controllers/residenceController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Routes accessible to authenticated users
router.get("/", getAllResidences);
router.get("/:id", getResidenceById);
router.post("/", createResidence);
router.put("/:id", updateResidence);
router.delete("/:id", deleteResidence);

export default router;
