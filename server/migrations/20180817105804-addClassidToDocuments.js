'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'documents',
        'classid',
         Sequelize.INTEGER
      ),
      queryInterface.removeColumn(
        'classes',
        'docids'
      ),
      queryInterface.removeColumn(
        'documents',
        'id'
      )
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      /* queryInterface.removeColumn(
        'documents',
        'classid',
      ),
      
      queryInterface.addColumn(
        'classes',
        'docids',
        Sequelize.INTEGER
      ),
      queryInterface.addColumn(
        'documents',
        'id',
        Sequelize.INTEGER
      )
      */
    ])
  }
};
