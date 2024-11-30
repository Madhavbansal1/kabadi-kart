const express = require("express");
const { SignUpUser, LoginUser, generateNewAccessToken, profile } = require("../controllers/userService");
const {getUserHistory} = require("../controllers/historyController");
const {completePurchase} = require("../controllers/transactionController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/user/signup",SignUpUser);
router.post("/user/login",LoginUser);
router.post("/user/new-token",generateNewAccessToken);
router.get("/user/:userId/history", getUserHistory);
router.post("/user/:userId/transction", completePurchase);
router.get("/user/profile", auth, profile);

module.exports = router;