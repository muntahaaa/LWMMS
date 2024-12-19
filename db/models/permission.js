'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Define the Permission model
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
    tableName: 'Permission',
    sequelize,
    modelName: 'Permission',
  }
);

Permission.associate = (models) => {
  Permission.belongsToMany(models.Role, {
    through: 'RolePermission',
    foreignKey: 'permissionId',
    otherKey: 'roleId',
    uniqueKey:false,
    as: 'roles', // Use plural alias
  });
};

module.exports = Permission;
