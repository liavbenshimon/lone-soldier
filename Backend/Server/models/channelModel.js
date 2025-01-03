import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["direct", "group", "eatup"], required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  eatupId: { type: mongoose.Schema.Types.ObjectId, ref: "EatUp" },
  isPublic: { type: Boolean, default: false }
});

export default mongoose.model("Channel", channelSchema);
