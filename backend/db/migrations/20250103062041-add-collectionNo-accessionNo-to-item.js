// filepath: /d:/LWMMS/LWMMS/backend/db/migrations/XXXXXXXXXXXXXX-add-collectionNo-accessionNo-to-item.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Items', 'collectionNo', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Items', 'accessionNo', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Items', 'collectionNo');
    await queryInterface.removeColumn('Items', 'accessionNo');
  }
};