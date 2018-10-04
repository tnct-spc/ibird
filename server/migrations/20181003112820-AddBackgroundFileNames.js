'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'schools',
      'background_images',
      {
        type: Sequelize.ARRAY(Sequelize.STRING)
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'schools',
      'background_images'
    )
  }
}
