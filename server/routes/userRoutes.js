const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

// Test handler fallback
const testHandler = (req, res) => res.send('User route working');

router.route('/')
  .get(protect, authorize('admin'), getAllUsers || testHandler)
  .post(protect, authorize('admin'), createUser || testHandler);

router.route('/:id')
  .get(protect, authorize('admin'), getUser || testHandler)
  .put(protect, authorize('admin'), updateUser || testHandler)
  .delete(protect, authorize('admin'), deleteUser || testHandler);

module.exports = router;