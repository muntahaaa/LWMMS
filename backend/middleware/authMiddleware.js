const jwt = require('jsonwebtoken');
const User = require('../db/models/user');
const AppError = require('../src/utils/appError');
const catchAsync = require('../src/utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token:', token); // Debugging statement
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); // Debugging statement
      return next(new AppError('Invalid token. Please log in again!', 401));
    }

    console.log('Decoded ID:', decoded.id); // Debugging statement

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    req.user = user;
    next();
  });
});

module.exports = { protect };