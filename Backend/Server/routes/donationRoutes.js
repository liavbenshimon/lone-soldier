import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonationById,
  deleteDonationById,
} from "../controllers/donationController.js";
import authenticateToken from "../middleware/authMiddleware.js"; // Import authentication middleware

const router = express.Router();

// POST: Create a new donation
router.post("/", authenticateToken, createDonation);

// GET: Retrieve all donations
router.get("/", authenticateToken, getAllDonations);

// GET: Retrieve a specific donation by ID
router.get("/:id", authenticateToken, getDonationById);

// PUT: Update a donation by ID
router.put("/:id", authenticateToken, updateDonationById);

// DELETE: Delete a donation by ID
router.delete("/:id", authenticateToken, deleteDonationById);

export default router;
