'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'schools',
        'message',
        {
          type: Sequelize.STRING
        }),
      queryInterface.addColumn(
        'schools',
        'messageEndDate',
        {
          type: Sequelize.DATE
        })
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'schools',
        'Message'
      ),
      queryInterface.removeColumn(
        'schools',
        'MessageEndDate'
      )
    ])
  }
}
