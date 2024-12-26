'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Items', 'mediaLocation', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '-',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Items', 'mediaLocation', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '-',
    });
  }
};