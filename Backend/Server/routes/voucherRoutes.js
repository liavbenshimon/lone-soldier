import express from "express";
import { createVoucher, redeemVoucher, getVouchers } from "../controllers/voucherController.js";
import { verifyToken, canAccessSocial } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken, canAccessSocial);

router.post("/", createVoucher); // Create a new voucher
router.put("/:code/redeem", redeemVoucher); // Redeem a voucher by code
router.get("/", getVouchers); // Get all vouchers

export default router;
