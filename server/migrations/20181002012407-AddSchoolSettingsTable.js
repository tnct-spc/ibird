'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('schools', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      background_image: Sequelize.STRING
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('schools')
  }
}
