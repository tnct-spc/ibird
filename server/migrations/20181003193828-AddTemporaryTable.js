'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('temporary_datas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NoCollisonKey: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      data: Sequelize.JSON,
      isActive: Sequelize.BOOLEAN
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('temporary_datas')
  }
}
