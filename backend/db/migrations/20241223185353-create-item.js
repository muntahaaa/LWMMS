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
      collectionNo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      accessionNo: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING
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
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: ['-'],
          
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