const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { signUp,login } = require('../controller/authController');

const authRouter = express.Router();

authRouter.use(cors());
authRouter.use(bodyParser.json());

authRouter.post('/signup', signUp);
authRouter.post('/login',login);

module.exports =authRouter;