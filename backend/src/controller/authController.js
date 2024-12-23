require('dotenv').config({ path: `${process.cwd()}/.env` });
const User = require('../../db/models/user');
const Role = require('../../db/models/role');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const signUp = catchAsync(async (req, res, next) => {

  const { Name, Email, Password, roleName } = req.body;

  try {
    const role = await Role.findOne({ where: { roleName } });
    if (!role) {

      throw new AppError('Role not found', 404);
    }

    const newUser = await User.create({
      Name,
      Email,
      Password,
      RoleID: role.id
    });

    const result = newUser.toJSON();
    delete result.Password;
    delete result.deletedAt;
    res.status(201).json({ newUser });
  } catch (error) {

    next(new AppError('Failed to create new User', 500));
  }

});

const login = catchAsync(async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {


      throw new AppError('Email and password are required', 400);
    }
    const result = await User.findOne({ where: { Email } });
    if (!result || !(await bcrypt.compare(Password, result.Password))) {


      throw new AppError('User not found. Check your email and password', 401);
    }
    const token = generateToken({
      id: result.id,

    });

    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data: { token }
    });
  } catch (error) {
    next(error);
  }

});

module.exports = { signUp, login };