// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
  },
  personalIdentificationNumber: {
    type: String,
    optional: true,
  },
  media: {
    type: [String], // An array of URLs
    default: [],
  },
  type: {
    type: String,
    enum: ["Soldier", "Contributor", "Admin"],
    default: "Soldier",
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, //ask shalev about false and ask liav about what is the authorId
  },
  // Additional fields for Profile
  nickname: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "", 
  },
  receiveNotifications: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
