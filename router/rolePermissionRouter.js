const express = require('express');
const { createRole } = require('../controller/rolePermissionController');

const rolePermissionRouter = express.Router();

rolePermissionRouter.post('/role', createRole);

module.exports = rolePermissionRouter;