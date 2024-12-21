import mongoose from "mongoose";

const LocationEnum = [
  "Tel Aviv",
  "Jerusalem",
  "Haifa",
  "Eilat",
  "Beer Sheva",
  "Ashdod",
  "Ashkelon",
  "Netanya",
  "Herzliya",
  "Raanana",
  "Petah Tikva",
  "Rishon Lezion",
  "Holon",
  "Bat Yam",
  "Kfar Saba",
  "Hadera",
  "Afula",
  "Tiberias",
]; // Enum for cities in Israel

const ZoneEnum = ["North", "South", "Center"]; // Enum for zones

const residenceSchema = new mongoose.Schema({
  enterDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    enum: LocationEnum,
    required: true,
  },
  meter: {
    type: Number,
    required: true,
  },
  partners: {
    type: Number,
    required: false, // Optional field
  },
  rooms: {
    type: Number,
    required: true,
  },
  zone: {
    type: String,
    enum: ZoneEnum,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true, // e.g., "Apartment", "House", "Studio"
  },
  description: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  propertyTax: {
    type: Number,
    required: true, // Monthly or yearly tax amount
  },
  shalter: {
    type: Boolean,
    required: true, // Indicates if the property has a shelter
  },
  media: {
    type: [String],
    default: [], // Link or description for media (e.g., photos, videos)
  },
  storage: {
    type: Boolean,
    required: true,
  },
  balcony: {
    type: Boolean,
    required: true,
  },
  contractDuration: {
    type: Number,
    required: true, // Duration of the contract in months
  },
  authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
});

const Residence = mongoose.model("Residence", residenceSchema);

export default Residence;
