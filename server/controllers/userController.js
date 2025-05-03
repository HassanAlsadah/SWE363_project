const User = require('../models/userModel');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('_id name email'); // Only return needed fields
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});
