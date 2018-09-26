'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('documents', 'timeLimit', 'endTime'),
      queryInterface.renameColumn('documents', 'scheduledDate', 'startTime')
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('documents', 'endTime', 'timeLimit'),
      queryInterface.renameColumn('documents', 'startTime', 'scheduledDate')
    ])
  }
}
