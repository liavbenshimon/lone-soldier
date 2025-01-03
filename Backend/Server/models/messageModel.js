import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

messageSchema.pre("find", function () {
  this.populate("sender", "firstName lastName email").populate(
    "readBy",
    "firstName lastName email"
  );
});

messageSchema.pre("findOne", function () {
  this.populate("sender", "firstName lastName email").populate(
    "readBy",
    "firstName lastName email"
  );
});

export default mongoose.model("Message", messageSchema);
