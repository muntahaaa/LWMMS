'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const Role = sequelize.define(
  'Role',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    roleName: {
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
    },
  },
  {
    tableName: 'Roles', //name will be plural
    sequelize,
    modelName: 'Role',
  }
);

Role.associate = (models) => {
  Role.belongsToMany(models.Permission, {
    through: 'RolePermissions',
    foreignKey: 'roleId',
    otherKey: 'permissionId',
    uniqueKey:false,
    as: 'permissions', // Use plural alias
  });
};
 Role.associate = (models) => {
   Role.hasMany(models.User, {
     foreignKey: 'RoleID'
   });
 };


module.exports = Role;

