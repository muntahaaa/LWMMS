require('dotenv').config({ path: `${process.cwd()}/.env` });
const User = require('../../db/models/user');
const Role= require('../../db/models/role');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const viewUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
      attributes: { exclude: ['Password', 'deletedAt'] },
      include: [{ model: Role, attributes: ['roleName'] }]
    });
  
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  });

  module.exports= {viewUsers};