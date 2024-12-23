'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Role = require('../models/role');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  Name: {
    type: Sequelize.STRING
  },
  Email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'email cannot be null',
      },
      notEmpty: {
        msg: 'email cannot be empty',
      },
    },
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'password cannot be null',
      },
      notEmpty: {
        msg: 'password cannot be empty',
      },
    },
  },
  RoleID: { 
    type: Sequelize.INTEGER,
    references: {
      model: 'Roles', // Ensure the table name matches the actual table name in the database
      key: 'id'
    },
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  tableName: 'Users', 
  sequelize,
  modelName: 'User',
});

// Define the associations
User.belongsTo(Role, {
  foreignKey: 'RoleID',
 
});
Role.hasMany(User, {
  foreignKey: 'RoleID',

});

User.beforeCreate(async (user) => {
  if (user.Password) {
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
  }
});

module.exports = User;
