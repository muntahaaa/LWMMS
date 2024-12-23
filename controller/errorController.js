require('dotenv').config({ path: `${process.cwd()}/.env` });
const { stack } = require("sequelize/lib/utils");
const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message;
    const stack = err.stack;

    res.status(statusCode).json({
        status,
        message,
        stack
    });
};
const sendErrorProd = (err, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message;
    const stack = err.stack;

    if (err.isOperational) {
        return res.status(statusCode).json({
            status,
            message,

        });
    } else {
        console.error('ERROR 💥', err);
        res.status(500).json({
          status: 'error',
          message: 'Something went very wrong!'
        });
      }


};
const globalErrorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        err = new AppError(err.errors[0].message, 401);

    }
    
    if (err.name === 'SequelizeUniqueConstraintError') {
        err = new AppError(err.errors[0].message, 400);
    }

    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        return sendErrorProd(err, res);
    }


};

module.exports = globalErrorHandler;