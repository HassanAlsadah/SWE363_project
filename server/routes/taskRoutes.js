// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getRecentTasks
} = require('../controllers/taskController');

router.get('/recent', protect, getRecentTasks);

module.exports = router;