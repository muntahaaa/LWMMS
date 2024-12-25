'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Item = require('./item');
const Tag = require('./tag');

const ItemTags = sequelize.define('ItemTags', {
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
      model: 'Items',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  tagId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tags',
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
  modelName: 'ItemTags',
});

console.log('Tag:', Tag);
console.log('Item: ',Item);


Tag.belongsToMany(Item, { through: ItemTags, foreignKey: 'tagId' });
Item.belongsToMany(Tag, { through: ItemTags, foreignKey: 'itemId' });

module.exports = ItemTags;