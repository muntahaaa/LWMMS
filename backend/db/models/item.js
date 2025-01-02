'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Role = require('./role');
const Contributor = require('./contributor');
const User = require('./user');

const Item = sequelize.define('Item', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'title cannot be null',
      },
      notEmpty: {
        msg: 'title cannot be empty',
      },
    },
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: '-',
  },
  
  location: {
    type: Sequelize.STRING,
    defaultValue: '-',
  },
  latitude: {
    type: Sequelize.FLOAT,
    defaultValue: '-',
  },
  longitude: {
    type: Sequelize.FLOAT,
    defaultValue: '-',
  },
  displayStatus: {
    type: Sequelize.ENUM('displayed', 'archived'),
   
  },
  createdBy: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  contributorID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Contributors',
      key: 'id'
    },
    onDelete: 'SET NULL',
  },
  mediaLocation: {
    type: Sequelize.TEXT,
    defaultValue: '-',

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
    type: Sequelize.DATE,
  }



}, {
  tableName: 'Items',
  sequelize,
  modelName: 'Item',
  paranoid: true


});

Contributor.hasMany(Item, {
  foreignKey: 'contributorID'
});
Item.belongsTo(Contributor, {
  foreignKey: 'contributorID'
});
User.hasMany(Item, {
  foreignKey: 'createdBy'
});
Item.belongsTo(User, {
  foreignKey: 'createdBy'
});

module.exports = Item;