'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('classes', 'year', Sequelize.TEXT)
    queryInterface.addColumn('classes', 'course', Sequelize.TEXT)
    queryInterface.removeColumn('classes', 'name')
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('classes', 'year')
    queryInterface.removeColumn('classes', 'course')
    queryInterface.addColumn('classes', 'name', Sequelize.TEXT)
  }
}
