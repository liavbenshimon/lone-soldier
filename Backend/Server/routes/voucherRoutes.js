import express from "express";
import {
  createVoucher,
  getVouchers,
  getVoucherById,
  deleteVoucher,
} from "../controllers/voucherController.js";
import { verifyToken, canAccessSocial } from "../middleware/auth.js";

const router = express.Router();

// Middleware for authentication and access control
router.use(verifyToken, canAccessSocial);

// Create a new voucher
router.post("/", createVoucher);

// Get all vouchers
router.get("/", getVouchers);

// Get a single voucher by ID
router.get("/:id", getVoucherById);

// Delete a voucher by ID
router.delete("/:id", deleteVoucher);

export default router;
