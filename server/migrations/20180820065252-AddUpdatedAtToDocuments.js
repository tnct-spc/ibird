'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'documents',
      'updatedAt',
      Sequelize.DATE
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'documents',
      'updatedAt'
    )
  }
}
