const mongoose = require("mongoose");
const History = require("../models/History");


const logTransaction = async (userId, transactionType, amount, itemDetails) => {
  try {
    const historyEntry = new History({
      userId: mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
      transactionType,
      amount,
      itemDetails,
    });
    await historyEntry.save();
  } catch (error) {
    console.error("Error logging transaction:", error);
    throw new Error("Failed to log transaction");
  }
};


const completePurchase = async (req, res) => {
  try {
    const { userId } = req.params; // Retrieve userId from params
    const { amount, itemDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }
    // add payment getways here
    // Log the transaction
    await logTransaction(userId, "sale", amount, itemDetails);

    res.status(200).json({ message: "Sale completed and logged." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Transaction logging failed." });
  }
};

module.exports = {
  completePurchase,
};
