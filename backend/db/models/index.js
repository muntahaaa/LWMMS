'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const Role= require('./role');
const Permission= require('./permission');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];
const db = {};

//const model = require(path.join(__dirname, file));
//model.init(sequelize, Sequelize.DataTypes);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.Role.hasMany(db.User, { foreignKey: 'roleID' });
db.User.belongsTo(db.Role, { foreignKey: 'roleID' });

db.Role.belongsToMany(db.Permission, { as: "permissions", foreignKey: 'roleID', through: 'RolePermission' });
db.Permission.belongsToMany(db.Role, { as: "roles", foreignKey: 'permissionID', through: 'RolePermission' });

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports =db;
