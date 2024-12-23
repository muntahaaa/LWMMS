const express = require('express');
const { createRole, createPermission, setUpAssociation, viewRoles, viewPermissions } = require('../controller/rolePermissionController');

const rolePermissionRouter = express.Router();

rolePermissionRouter.post('/role', createRole);
rolePermissionRouter.post('/permission', createPermission);
rolePermissionRouter.get('/view-roles', viewRoles);
rolePermissionRouter.get('/view-permissions', viewPermissions);
rolePermissionRouter.post('/set-association', setUpAssociation);


module.exports = rolePermissionRouter;