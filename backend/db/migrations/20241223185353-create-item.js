'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
          notNull: {
            msg: 'title cannot be null',
          },
          notEmpty: {
            msg: 'title cannot be empty',
          },
        }, 
      },
      description: {
        type: Sequelize.STRING
      },
     category: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      location: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      displayStatus: {
        type: Sequelize.ENUM('displayed', 'archived')
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      contributorID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contributors',
          key: 'id'
        }
      },
       mediaLocation: {
          type: Sequelize.STRING,
          defaultValue: '-',
          
       },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};