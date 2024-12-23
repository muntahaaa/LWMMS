'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
        allowNull:false,
        unique: true,
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
        allowNull:false,
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
            model: 'Roles',
            key: 'id'
          }
       },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};