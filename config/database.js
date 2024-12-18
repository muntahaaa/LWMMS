const {Sequelize} = require('sequelize');   

const env= process.env.NODE_ENV|| 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: process.env.DB_PORT,
  });
  

module.exports = sequelize;