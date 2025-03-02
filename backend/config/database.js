const {Sequelize} = require('sequelize');   

const env= process.env.NODE_ENV|| 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: process.env.DB_PORT,
  });
  

  const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { sequelize, connectDB };