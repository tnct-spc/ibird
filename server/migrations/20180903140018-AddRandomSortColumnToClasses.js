'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'classes',
      'randomSort',
      {
        type: Sequelize.BOOLEAN
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'classes',
      'randomSort'
    )
  }
};
