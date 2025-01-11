import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    description: { type: String, required: true }, // תיאור ההנחה
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true }, // רפרנס לעסק
    discountAmount: { type: Number, required: true }, // סכום ההנחה
    expiryDate: { type: Date, required: true }, // תאריך סיום
  },
  { timestamps: true } // יוצר אוטומטית תאריכי יצירה ועדכון
);

export default mongoose.model("Voucher", voucherSchema);
