'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'classes',
      'classid'
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'classes',
      'classid',
      Sequelize.INTEGER
    )
  }
};
