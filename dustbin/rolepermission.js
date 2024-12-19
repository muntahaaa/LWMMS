'use strict';
const {
  Model, Sequelize, DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
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
      model: 'Role',
      key: 'id'
    }
  },
  permissionID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Permission',
      key: 'id'
    }
  },
  isActive: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },deletedAt: {
    type: Sequelize.DATE,
    defaultValue: null
  }, 
  }, {
    tableName: 'RolePermission',
    sequelize,
    modelName: 'RolePermission',
  });


