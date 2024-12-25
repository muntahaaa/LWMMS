const express = require('express');
const {viewUsers}= require('../controller/userController');
const {protect} = require('../../middleware/authMiddleware');
const checkPermissions = require('../../middleware/checkPermission'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = express.Router();
userRouter.use(cors());
userRouter.use(bodyParser.json());

userRouter.get('/view',viewUsers);

//userRouter.get('/view',protect,checkPermissions('View Users'),viewUsers);
module.exports= userRouter;