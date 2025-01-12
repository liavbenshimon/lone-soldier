import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    image: {
       type: String, required: false }, // URL של התמונה
      description: { type: String, required: false }, // תיאור התמונה
    },
    { timestamps: true }
);

export default mongoose.model("Business", businessSchema);
