const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// GET /api/v1/users - accessible by all authenticated users
router.route('/').get(protect, getAllUsers);

module.exports = router;
