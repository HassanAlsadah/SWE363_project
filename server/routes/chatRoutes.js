const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Get all chats
router.get('/', chatController.getAllChats);

// Get single chat
router.get('/:id', chatController.getChatById);

// Create new chat
router.post('/', chatController.createChat);

// Add message to chat
router.post('/:id/messages', chatController.addMessage);

// Mark chat as read
router.patch('/:id/read', chatController.markAsRead);

module.exports = router;