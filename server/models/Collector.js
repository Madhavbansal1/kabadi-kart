const mongoose = require('mongoose');

const collectorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.'],
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String, 
      required: true,
      trim: true,
    },
    serviceAreas: [
      {
        pincode: { type: String, required: true },
        city: { type: String, required: true },
      },
    ],
    tokens: {
        accessToken:{
            token: String,
            expireAt: Date
        },
        refreshToken:{
            token: String,
            expireAt: Date
        }
    }
  },
  {
    timestamps: true,
  }
);

const Collector = mongoose.model('Collector', collectorSchema);

module.exports = Collector;
