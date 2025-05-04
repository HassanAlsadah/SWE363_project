const express = require('express');
const router = express.Router();
const { getMe, updateDetails } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.route('/me').get(protect, getMe);
router.route('/update-details').put(protect, updateDetails);

module.exports = router;