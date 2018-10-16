'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'classes',
      'qrLoginPassword',
      {
        type: Sequelize.STRING
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'classes',
      'qrLoginPassword'
    )
  }
}
