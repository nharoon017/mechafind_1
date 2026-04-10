const express = require('express');
const router = express.Router();
const { verifyToken, requireMechanic } = require('../middleware/authMiddleware');
const {
  registerMechanic,
  loginMechanic,
  getMechanicProfile,
  updateMechanicProfile,
  getMechanicRequests,
  updateRequestStatus,
} = require('../controllers/mechanicController');

// Auth routes
router.post('/register', registerMechanic);
router.post('/login', loginMechanic);

// Protected routes
router.get('/profile', verifyToken, requireMechanic, getMechanicProfile);
router.put('/profile', verifyToken, requireMechanic, updateMechanicProfile);
router.get('/requests', verifyToken, requireMechanic, getMechanicRequests);
router.put('/requests/:id', verifyToken, requireMechanic, updateRequestStatus);
router.put('/requests/:id/complete', verifyToken, requireMechanic, updateRequestStatus); // Alias for complete

module.exports = router;