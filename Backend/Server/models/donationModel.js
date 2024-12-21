import mongoose, { Schema, model } from "mongoose";

const ZoneEnum = ["North", "South", "Center"]; // Define the possible values for zone
const CategoryEnum = ["Furniture", "Clothes", "Electricity", "Army Equipments"]; // Define the possible values for category

const donationSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      enum: ZoneEnum,
      required: true,
    },
    category: {
      type: String,
      enum: CategoryEnum, 
      required: true,
    },
    ownerPhone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: {
      type: [String],
      default: [],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const donation = model("Donation", donationSchema);

export default donation;
