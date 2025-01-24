const express = require('express');
const cors = require('cors');
const { createRole, createPermission, setUpAssociation, viewRoles, viewPermissions, getRolePermissions } = require('../controller/rolePermissionController');
const bodyParser = require('body-parser');

const rolePermissionRouter = express.Router();
rolePermissionRouter.use(cors());
rolePermissionRouter.use(bodyParser.json());

rolePermissionRouter.post('/role', createRole);
rolePermissionRouter.post('/permission', createPermission);
rolePermissionRouter.get('/view-roles', viewRoles);
rolePermissionRouter.get('/view-permissions', viewPermissions);
rolePermissionRouter.get('/role-permission',getRolePermissions)
rolePermissionRouter.post('/set-association', setUpAssociation);


module.exports = rolePermissionRouter;