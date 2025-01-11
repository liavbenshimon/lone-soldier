import Voucher from "../models/voucherModel.js";

// Create a new voucher
export const createVoucher = async (req, res) => {
  try {
    const { code, amount, expiryDate } = req.body;
    const voucher = new Voucher({ code, amount, expiryDate });
    await voucher.save();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Redeem a voucher
export const redeemVoucher = async (req, res) => {
  try {
    const { code } = req.params;
    const userId = req.body.userId;
    const voucher = await Voucher.findOne({ code, isRedeemed: false });
    if (!voucher) {
      return res.status(404).json( "Voucher not found or already redeemed");
    }
    voucher.isRedeemed = true;
    voucher.redeemedBy = userId;
    await voucher.save();
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json( error.message );
  }
};

// Get all vouchers
export const getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
