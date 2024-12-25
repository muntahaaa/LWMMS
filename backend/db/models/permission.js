'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const Permission = sequelize.define(
  'Permission',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    permissionName: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: 'Permissions',
    sequelize,
    modelName: 'Permission',
  }
);

Permission.associate = (models) => {
  Permission.belongsToMany(models.Role, {
    through: 'RolePermissions',
    foreignKey: 'permissionId',
    otherKey: 'roleId',
    uniqueKey:false,
    as: 'roles', // Use plural alias
  });
};

module.exports = Permission;
