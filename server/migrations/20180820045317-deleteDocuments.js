'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('documents')
  },

  down: (queryInterface, Sequelize) => {

  }
}
