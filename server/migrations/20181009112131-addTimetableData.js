'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'schools',
      'timetable',
      {
        type: Sequelize.JSON
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'schools',
      'timetable'
    )
  }
}
