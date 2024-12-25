const express = require('express');
const {viewUsers}= require('../controller/userController');
const {protect} = require('../../middleware/authMiddleware');
const checkPermissions = require('../../middleware/checkPermission'); 

const userRouter = express.Router();

userRouter.get('/view',viewUsers);

//userRouter.get('/view',protect,checkPermissions('View Users'),viewUsers);
module.exports= userRouter;