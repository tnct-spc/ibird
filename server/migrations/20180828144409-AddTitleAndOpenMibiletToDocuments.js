'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'documents',
        'title',
        {
          type: Sequelize.TEXT
        }),
      queryInterface.addColumn(
        'documents',
        'openMobile',
        {
          type: Sequelize.BOOLEAN
        })

    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'documents',
        'title'
      ),
      queryInterface.removeColumn(
        'documents',
        'openMobile'
      )
    ])
  }
}
