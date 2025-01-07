import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonationById,
  deleteDonationById,
} from "../controllers/donationController.js";
import { verifyToken, isDonor } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Create donation - only donors can create
router.post("/", isDonor, createDonation);

// Other routes are accessible to authenticated users
router.get("/", getAllDonations);
router.get("/:id", getDonationById);
router.put("/:id", updateDonationById);
router.delete("/:id", deleteDonationById);

export default router;
