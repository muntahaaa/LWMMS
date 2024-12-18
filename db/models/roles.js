'use strict';
const {
  Model, Sequelize, DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');
module.exports = sequelize.define('Role', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  roleName: {
    type: Sequelize.STRING
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
  }, 
  deletedAt: {
    type: Sequelize.DATE
  }
}, {
  tableName: 'Role',
  sequelize,
  modelName: 'Role',
});