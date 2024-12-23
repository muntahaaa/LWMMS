'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Contributor = sequelize.define('Contributor',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  contributorName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
}, {
  tableName: 'Contributors',
  sequelize,
  modelName: 'Contributor'
}
);
module.exports= Contributor;