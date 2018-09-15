'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'documents',
        'sizeX',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn(
        'documents',
        'sizeY',
        {
          type: Sequelize.INTEGER
        })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'documents',
        'sizeX'
      ),
      queryInterface.removeColumn(
        'documents',
        'sizeY'
      )
    ])
  }
};
