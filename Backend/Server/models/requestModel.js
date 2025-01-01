import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
//   name: { type: String, required: true },
user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  age: { type: Number, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
  service: { type: String, enum: ['סדיר', 'מילואים'], required: true },
  itemType: { type: String, required: true },
  itemDescription: { type: String },
  quantity: { type: Number, required: true },
  urgency: { type: String, enum: ['מידי', 'תאריך ספציפי'], required: true },
  geographicArea: { type: String },
  additionalNotes: { type: String },
  agreeToShareDetails: { type: Boolean, required: true }
}, { timestamps: true });

export default mongoose.model('Request', requestSchema);
