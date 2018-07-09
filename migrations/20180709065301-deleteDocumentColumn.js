'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'classes',
      'document',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'classes',
      'document',
       Sequelize.ARRAY(Sequelize.JSON)
    );

  }
};
