'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes', {
      classid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      documents: {
        type: Sequelize.JSON
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('classes')
  }
}
