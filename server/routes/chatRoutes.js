// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getRecentChats
} = require('../controllers/chatController');

router.get('/recent', protect, getRecentChats);

module.exports = router;