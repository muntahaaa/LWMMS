'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      permissionID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Permissions',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null
      },
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RolePermissions');
  }
};