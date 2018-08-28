'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'documents',
        'Title',
        {
          type: Sequelize.TEXT
        }),
      queryInterface.addColumn(
        'documents',
        'OpenMobile',
        {
          type: Sequelize.BOOLEAN
        })

    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'documents',
        'Title'
      ),
      queryInterface.removeColumn(
        'documents',
        'OpenMobile'
      )
    ])
  }
}
