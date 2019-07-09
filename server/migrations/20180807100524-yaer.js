'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('classes', 'year', Sequelize.TEXT),
      queryInterface.addColumn('classes', 'course', Sequelize.TEXT),
      queryInterface.removeColumn('classes', 'name')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('classes', 'year'),
      queryInterface.removeColumn('classes', 'course'),
      queryInterface.addColumn('classes', 'name', Sequelize.TEXT)
    ])
  }
}
