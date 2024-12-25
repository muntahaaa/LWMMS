'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Tag = sequelize.define('Tags', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: 'Tag name cannot be null' },
      notEmpty: { msg: 'Tag name cannot be empty' },
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'Tags',
 
});

module.exports = Tag;