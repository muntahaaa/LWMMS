const express = require('express');
const {viewUsers}= require('../controller/userController');

const userRouter = express.Router();

userRouter.get('/view',viewUsers);
module.exports= userRouter;