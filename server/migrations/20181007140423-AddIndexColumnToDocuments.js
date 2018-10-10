'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'documents',
      'overlapPriority',
      {
        type: Sequelize.INTEGER
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'documents',
      'overlapPriority'
    )
  }
}
