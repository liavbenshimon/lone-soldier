import Voucher from "../models/voucherModel.js";

// Create a new voucher
export const createVoucher = async (req, res) => {
  try {
    const { description, business, discountAmount, expiryDate } = req.body;

    // Validating required fields
    if (!description || !business || !discountAmount || !expiryDate) {
      return res.status(400).json("All fields are required.");
    }

    const voucher = new Voucher({
      description,
      business,
      discountAmount,
      expiryDate,
    });

    await voucher.save();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get all vouchers
export const getVouchers = async (req, res) => {
  try {
    // Populate the business reference to return full business details
    const vouchers = await Voucher.find().populate("business");
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get a single voucher by ID
export const getVoucherById = async (req, res) => {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findById(id).populate("business");

    if (!voucher) {
      return res.status(404).json("Voucher not found.");
    }

    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete a voucher
export const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findByIdAndDelete(id);

    if (!voucher) {
      return res.status(404).json("Voucher not found.");
    }

    res.status(200).json({ message: "Voucher deleted successfully." });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
