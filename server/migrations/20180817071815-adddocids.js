'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'classes',
        'docids',
        Sequelize.ARRAY(Sequelize.INTEGER)
      ),
      queryInterface.removeColumn(
        'classes',
        'documents'
      )
    ])
  },
  down: (queryInterface, Sequelize) => {

  }
}
