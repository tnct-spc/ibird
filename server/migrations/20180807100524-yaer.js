'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('classes', 'yaer', Sequelize.TEXT)
    queryInterface.addColumn('classes', 'course', Sequelize.TEXT)
    queryInterface.removeColumn('classes', 'name')
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('classes', 'yaer')
    queryInterface.removeColumn('classes', 'course')
    queryInterface.addColumn('classes', 'name', Sequelize.TEXT)
  }
};
