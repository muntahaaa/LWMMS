//const { Role, Permission, RolePermission, User } = require('../db/models');
const Role = require('../db/models/role');
const Permission = require('../db/models/permission');
const User = require('../db/models/user');
const RolePermission = require('../db/models/rolepermission');
const AppError = require('../src/utils/appError');
const catchAsync = require('../src/utils/catchAsync');

const checkPermissions = (permissionName) => {
  return catchAsync(async (req, res, next) => {
    // Ensure req.user exists and is properly populated by the auth middleware
    if (!req.user || !req.user.id) {
      return next(new AppError('User not authenticated', 401));
    }

    const userId = req.user.id;

    // Fetch user and role from the database
    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        attributes: ['id', 'roleName'],
      },
    });

    if (!user || !user.Role) {
      return next(new AppError('User role not found', 403));
    }

    const roleId = user.Role.id;

    // Extract the permissionId from the Permission table based on permissionName
    const permission = await Permission.findOne({
      where: {
        permissionName: permissionName, // Query by permissionName
      },
    });

    if (!permission) {
      return next(new AppError('Permission not found', 404)); 
    }

    const permissionId = permission.id;

    // Check rolePermission to see if this role has the required permission
    const rolePermission = await RolePermission.findOne({
      where: {
        roleID: roleId,       // match DB column name
        permissionID: permissionId,
      },
      /*include: {
        model: Permission,
     
        attributes: ['name'],
      },*/
    });
    console.log("Role id: ", roleId);
    console.log("Permission id: ", permissionId);

    if (!rolePermission) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  });
};

module.exports = checkPermissions;
