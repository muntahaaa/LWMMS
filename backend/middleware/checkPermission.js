//const { Role, Permission, RolePermission, User } = require('../db/models');
const Role = require('../db/models/role');
const Permission = require('../db/models/permission');
const User = require('../db/models/user');
const RolePermission = require('../db/models/rolepermission');
const AppError = require('../src/utils/appError');
const catchAsync = require('../src/utils/catchAsync');

const checkPermissions = (requiredPermission) => {
  return catchAsync(async (req, res, next) => {
    const userId = req.user.id;

  
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

    const rolePermission = await RolePermission.findOne({
      where: {
        roleId,
        permissionId: requiredPermission,
      },
      include: {
        model: Permission,
        attributes: ['name'],
      },
    });

    if (!rolePermission) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  });
};

module.exports = checkPermissions;