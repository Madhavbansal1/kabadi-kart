const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: ["sale", "donation"], // Define transaction types relevant to your application
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    itemDetails: {
      type: String,
      required: true, // Store details about the items involved in the transaction
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", HistorySchema);
module.exports = History;
