import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or just store username/email if you prefer
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  readBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
    required: true,
  },
  // e.g. if you want to mark pinned messages or ephemeral messages
  // pinned: { type: Boolean, default: false },
  // ephemeral: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
