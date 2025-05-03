const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');

// Helper function to generate token
const sendTokenResponse = (user, statusCode, res) => {
  // Create token with proper expiration handling
  const token = jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '1h' // Fallback to 1 hour if not set
    }
  );

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 1) * 24 * 60 * 60 * 1000 // Default 1 day
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role = 'user' } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return next(new ErrorResponse('Please provide name, email and password', 400));
    }

    // Validate email format
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return next(new ErrorResponse('Please provide a valid email', 400));
    }

    // Validate email is unique
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse('Email already in use', 400));
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role
    });

    // Automatically log in user after registration
    sendTokenResponse(user, 201, res);
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new ErrorResponse(messages.join(', '), 400));
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      return next(new ErrorResponse('Duplicate field value entered', 400));
    }
    
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    // Validate at least one field is being updated
    if (!fieldsToUpdate.name && !fieldsToUpdate.email && !fieldsToUpdate.phone) {
      return next(new ErrorResponse('Please provide fields to update', 400));
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return next(new ErrorResponse('Password is incorrect', 401));
    }

    // Validate new password
    if (!req.body.newPassword || req.body.newPassword.length < 6) {
      return next(new ErrorResponse('Password must be at least 6 characters', 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.status(200).json({
    success: true,
    data: {}
  });
};