require('dotenv').config({ path: `${process.cwd()}/.env` });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
});

(async () => {
  try {
    await sequelize.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
    console.log(`Database ${process.env.DB_NAME} created successfully.`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
})();