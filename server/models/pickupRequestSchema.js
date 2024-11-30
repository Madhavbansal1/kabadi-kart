const mongoose = require('mongoose');

const PickupRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    option: { type: String, enum: ['sell', 'donate'], required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    category: { type: [String], required: true },
    scrapImage: { type: String, required: true }, // URL from Cloudinary
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'completed','cancelled'], default: 'pending' }, // Track request status
    acceptedBy: { type: String, default: null }, // Reference to the collector who accepted
    collectorName:{type: String, default: null},
    collectorPhone: {type: String, default: null}
  },
  { timestamps: true }
);

module.exports = mongoose.model('PickupRequest', PickupRequestSchema);
