'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Item = require('./item');
const Category = require('./category');

const ItemCategories = sequelize.define('ItemCategories', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Items', // Ensure the model name matches exactly
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories', // Ensure the model name matches exactly
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
  }
}, {
  freezeTableName: true,
  modelName: 'ItemCategories',
});

Item.belongsToMany(Category, { through: ItemCategories, foreignKey: 'itemId' });

Category.belongsToMany(Item, { through: ItemCategories, foreignKey: 'categoryId' });

module.exports = ItemCategories;