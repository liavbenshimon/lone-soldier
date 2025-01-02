import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // If you have a separate User model
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
  closeAt: {
    type: Date,
    default: null,
    required: false,
  },
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
