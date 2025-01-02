import mongoose from 'mongoose';

const donationRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, enum: ['Regular', 'Reserves'], required: true },
  itemType: { type: String, required: true },
  itemDescription: { type: String },
  quantity: { type: Number, required: true },
  urgency: { type: String, enum: ['Immediate', 'Specific Date'], required: true },
  geographicArea: { type: String },
  notes: { type: String },
  agreeToShareDetails: { type: Boolean, required: true },
  status: { 
    type: String, 
    enum: ['approved', 'deny', 'in process'], 
    default: 'in process',  // Default value is 'in process'
    required: true 
  }
}, { timestamps: true });

const Donationrequest = mongoose.model("Donationrequest", donationRequestSchema);

export default Donationrequest;
