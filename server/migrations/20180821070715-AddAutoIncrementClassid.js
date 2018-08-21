'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'classes',
      'classid',
      {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'classes',
      'classid'
    )
  }
};
