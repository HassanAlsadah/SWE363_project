// controllers/chatController.js
const Chat = require('../models/chatModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');




// @desc    Get recent chats for current user
// @route   GET /api/v1/chats/recent
// @access  Private
exports.getRecentChats = asyncHandler(async (req, res, next) => {
  const chats = await Chat.find({
    $or: [
      { 'participants.user': req.user.id },
      { 'projectMembers.user': req.user.id }
    ]
  })
  .populate('participants.user', 'name email')
  .populate('project', 'name')
  .sort('-updatedAt')
  .limit(3);

  res.status(200).json({
    success: true,
    count: chats.length,
    data: chats
  });
});
// @desc    Get recent chats for current user
// @route   GET /api/v1/chats/recent
// @access  Private
exports.getRecentChats = async (req, res, next) => {
  try {
    const recentChats = await Chat.find({
      $or: [
        { 'participants': req.user.email },
        { 'projectMembers': req.user.email }
      ]
    })
    .sort({ updatedAt: -1 })
    .limit(3)
    .select('name unread project lastMessage');

    res.status(200).json(recentChats);
  } catch (err) {
    next(err);
  }
};