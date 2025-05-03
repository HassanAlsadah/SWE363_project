const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Test route handler
const testHandler = (req, res) => res.send('Test route working');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);
router.put('/updatedetails', protect, updateDetails || testHandler); // Fallback to test handler
router.put('/updatepassword', protect, updatePassword || testHandler); // Fallback to test handler

module.exports = router;