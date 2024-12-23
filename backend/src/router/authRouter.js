const express = require('express');
const { signUp,login } = require('../controller/authController');

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login',login);

module.exports =authRouter;