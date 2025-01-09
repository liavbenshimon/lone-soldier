import Voucher from "../models/voucherModel.js";

// Create a new voucher
export const createVoucher = async (req, res) => {
  try {
    const { code, amount, expiryDate } = req.body;
    const voucher = new Voucher({ code, amount, expiryDate });
    await voucher.save();
    res.status(201).json({ success: true, data: voucher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Redeem a voucher
export const redeemVoucher = async (req, res) => {
  try {
    const { code } = req.params;
    const userId = req.body.userId;
    const voucher = await Voucher.findOne({ code, isRedeemed: false });
    if (!voucher) {
      return res.status(404).json({ success: false, message: "Voucher not found or already redeemed" });
    }
    voucher.isRedeemed = true;
    voucher.redeemedBy = userId;
    await voucher.save();
    res.status(200).json({ success: true, data: voucher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all vouchers
export const getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json({ success: true, data: vouchers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
