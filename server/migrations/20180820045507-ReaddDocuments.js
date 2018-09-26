'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('documents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      classid: {
        type: Sequelize.INTEGER
      },
      docid: {
        type: Sequelize.STRING
      },
      x: {
        type: Sequelize.INTEGER
      },
      y: {
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
      },
      priority: {
        type: Sequelize.INTEGER
      }
    })
  },

  down: (queryInterface, Sequelize) => {

  }
}
