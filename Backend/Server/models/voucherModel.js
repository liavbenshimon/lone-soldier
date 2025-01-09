import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    isRedeemed: { type: Boolean, default: false },
    redeemedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Voucher", voucherSchema);
