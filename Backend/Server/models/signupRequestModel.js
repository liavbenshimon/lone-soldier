import mongoose from "mongoose";

const signupRequestSchema = new mongoose.Schema({
  // User details
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
    type: [String],
    default: [],
  },
  type: {
    type: String,
    enum: ["Soldier", "Contributor"],
    required: true,
  },
  // Request status
  approved: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: String,
    enum: ["submitted", "under review", "waiting kyc", "completed"],
    default: "submitted",
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
signupRequestSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const SignupRequest = mongoose.model("SignupRequest", signupRequestSchema);

export default SignupRequest;
