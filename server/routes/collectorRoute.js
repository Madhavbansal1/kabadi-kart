const express = require("express");
const { SignUpUser, LoginUser, generateNewAccessToken, profile } = require("../controllers/collectorService");
const { auth } = require("../middlewares/authMiddleware");
const { Collector_auth } = require("../middlewares/auth_collectorMiddleware");
const PickupRequest = require("../models/pickupRequestSchema");

const router = express.Router();


router.post("/collector/signup",SignUpUser);
router.post("/collector/login",LoginUser);
router.post("/collector/new-token",generateNewAccessToken);
router.get("/collector/profile", auth, profile);
router.get('/collector/accepted-requests', Collector_auth, async (req, res) => {
    try {
      // Get the collector's user ID from the authenticated request
      console.log(req.user.email)
      const Collector_email = req.user.email;
      console.log("collector_email"+ Collector_email)
  
      // Find all accepted requests for this collector
      const acceptedRequests = await PickupRequest.find({
        acceptedBy: Collector_email,
        status: 'accepted', // Assuming 'accepted' is a valid status for requests
      });
      console.log("accepted request "+JSON.stringify(acceptedRequests))
  
      res.status(200).json({ data: acceptedRequests });
    } catch (error) {
      console.error('Error fetching accepted requests:', error);
      res.status(500).json({ message: 'Failed to fetch accepted requests' });
    }
  });

module.exports = router;