'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('school',
      [
        {
          name: 'tokyo-ct',
          background_image: 'minimal_background.png'
        }
      ]
      , {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('school', null, {})
  }
}
