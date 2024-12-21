import mongoose from "mongoose";

const ZoneEnum = ["North", "South", "Center"]; // Define the possible values for zone


const eatupSchema = new mongoose.Schema({
    zone: {
        type: String,
        enum: ZoneEnum,
        required: true,
      },
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  media: {
    type: [String], // An array of URLs
    default: []
  },
  owner: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  kosher: {
    type: Boolean, 
    required: true,
  },
  description: {
    type: String,
    required: false, 
  },
  language: {
    type: String,
    required: true,
  },
  hosting: {
    type: String,
    required: false,
  },
  religios: {
    type: Boolean,
    required: false,
  },
  authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
});


const EatUp = mongoose.model("EatUp", eatupSchema);

export default EatUp;
