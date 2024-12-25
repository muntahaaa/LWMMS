'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
// const Item = require('./item');
// const ItemCategories = require('./item_category');

const Category = sequelize.define('Categories', {
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
      notNull: { msg: 'Category name cannot be null' },
      notEmpty: { msg: 'Category name cannot be empty' },
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
  modelName: 'Categories',
});

// Define many-to-many relationship between Category and Item
// Category.belongsToMany(Item, { through: ItemCategories, foreignKey: 'categoryId' });

module.exports = Category;