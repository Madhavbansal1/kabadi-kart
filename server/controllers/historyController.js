const History = require("../models/History");

const getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;

   
    const history = await History.find({ userId })
      .sort({ transactionDate: -1 })
      .limit(10);

    
    if (history.length === 0) {
      return res.status(200).json({ message: "No transactions found.", history: [] });
    }

    console.log(history);

  
    return res.status(200).json({ history });

  } catch (error) {
    console.error(`Error fetching transaction history for user ${req.params.userId}:`, error);
    res.status(500).json({ error: "Unable to fetch transaction history." });
  }
};

module.exports = { getUserHistory };
