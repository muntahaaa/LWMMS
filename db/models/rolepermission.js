'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
module.exports = sequelize.define('RolePermission', { 
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  roleID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Roles',
      key: 'id'
    }
  },
  permissionID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Permissions',
      key: 'id'
    }
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE,
    defaultValue: null
  },
 
},{
  tableName: 'RolePermission',
  sequelize,
  modelName: 'RolePermission',
});


