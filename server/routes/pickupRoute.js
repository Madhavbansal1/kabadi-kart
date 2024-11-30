const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
const PickupRequest = require('../models/pickupRequestSchema');
const { auth } = require('../middlewares/authMiddleware');
const { Collector_auth } = require('../middlewares/auth_collectorMiddleware');

dotenv.config();



// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer-Cloudinary setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'scrapImages',
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });

// Export the route as a function to accept `io` and notify functions
module.exports = (io, notifyNewRequest, notifyRequestUpdate) => {
  
  const router = express.Router();
  // Create a new pickup request
  router.post('/pickup-requests', upload.single('scrapImage'), async (req, res) => {
    // console.log(io +" "+ notifyNewRequest + " " + notifyRequestUpdate)
    try {
      const {
        name,
        phone,
        email,
        option,
        pickupDate,
        pickupTime,
        category,
        address,
        pincode,
      } = req.body;

      const scrapImage = req.file ? req.file.path : null;

      const parsedCategory = Array.isArray(category) ? category : JSON.parse(category);

      const newRequest = new PickupRequest({
        name,
        phone,
        email,
        option,
        pickupDate,
        pickupTime,
        category: parsedCategory,
        scrapImage,
        address,
        pincode,
        status: 'pending', // Default status
      });

      await newRequest.save();

      // Notify all collectors about the new request
      console.log("notifyNewRequest se upr hai");
      
      notifyNewRequest(newRequest);
       
      

      res.status(201).json({
        success: true,
        message: 'Pickup request submitted successfully!',
        data: newRequest,
      });
    } catch (err) {
      console.error('Error creating pickup request:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to submit the pickup request. Please try again later.',
      });
    }
  });

  router.get('/pickup-requests',auth,async(req,res)=>{
    try {
      const Requests = await PickupRequest.find({ email: req.user.email, status: 'pending' });
      console.log(Requests);

      res.status(200).json({
        success: true,
        data: Requests,
      });
    } catch (err) {
      console.error('Error fetching requests:', err);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching  requests.',
      });
    }
  });
  // Accept a pickup request
  router.patch('/pickup-requests/:requestId/accept', Collector_auth, async (req, res) => {
    try {
      const { requestId } = req.params;
      console.log(requestId);
      
      
      
      const collectorEmail = req.user.email; // Assuming `auth` middleware adds user info
      const collectorname = req.user.name;

      // Update request if it is still pending
      const acceptedRequest = await PickupRequest.findOneAndUpdate(
        { _id: requestId, status: 'pending' },
        { status: 'accepted', acceptedBy: collectorEmail, collectorName: collectorname },
        { new: true }
      );

      if (!acceptedRequest) {
        return res.status(400).json({
          success: false,
          message: 'Request is already accepted or not found.',
        });
      }

      // Notify all collectors about the update
      notifyRequestUpdate({
        message: 'Request accepted',
        request: acceptedRequest,
      });

      res.status(200).json({
        success: true,
        message: 'Pickup request accepted successfully!',
        data: acceptedRequest,
      });
    } catch (err) {
      console.error('Error accepting pickup request:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to accept the pickup request. Please try again later.',
      });
    }
  });

  // Mark a pickup request as completed
  router.patch('/pickup-requests/:requestId/complete', auth, async (req, res) => {
    try {
      const { requestId } = req.params;
      console.log("backend cpmplete"+ requestId);

      // Update request status to 'completed'
      const completedRequest = await PickupRequest.findOneAndUpdate(
        { _id: requestId, status: 'accepted'},
        { status: 'completed' },
        { new: true }
      );

      if (!completedRequest) {
        return res.status(400).json({
          success: false,
          message: 'Request is not found or not accepted by you.',
        });
      }

      // Notify all collectors about the completion
      notifyRequestUpdate({
        message: 'Request completed',
        request: completedRequest,
      });

      res.status(200).json({
        success: true,
        message: 'Pickup request marked as completed.',
        data: completedRequest,
      });
    } catch (err) {
      console.error('Error completing pickup request:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to mark the request as completed. Please try again later.',
      });
    }
  });
  router.patch('/pickup-requests/:requestId', auth, async (req, res) => {
    try {
      const { requestId } = req.params;
      console.log("backend cancel"+ requestId);

      // Update request status to 'completed'
      const completedRequest = await PickupRequest.findOneAndUpdate(
        { _id: requestId},
        { status: 'cancelled' },
        { new: true }
      );

      if (!completedRequest) {
        return res.status(400).json({
          success: false,
          message: 'Request is not found or not accepted by you.',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Pickup request marked as cancelled.',
        data: completedRequest,
      });
    } catch (err) {
      console.error('Error cancel pickup request:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to mark the request as completed. Please try again later.',
      });
    }
  });

  

  return router;
};
