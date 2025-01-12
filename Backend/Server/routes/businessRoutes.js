import express from "express";
import {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} from "../controllers/businessController.js";
import {isBusiness, verifyToken} from "../middleware/auth.js";

const router = express.Router();
router.use(verifyToken);

// Create a new business
router.post("/",isBusiness, createBusiness);

// Get all businesses
router.get("/", getBusinesses);

// Get a single business by ID
router.get("/:id", getBusinessById);

// Update a business by ID
router.put("/:id",isBusiness, updateBusiness);

// Delete a business by ID
router.delete("/:id",isBusiness, deleteBusiness);

export default router;
