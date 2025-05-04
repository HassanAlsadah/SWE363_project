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


// @desc    Get current user
// @route   GET /api/v1/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/v1/users/update-details
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    teamsAccount: req.body.teamsAccount,
    degree: req.body.degree,
    certificates: req.body.certificates
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  }).select('-password');

  res.status(200).json({
    success: true,
    data: user
  });
});
