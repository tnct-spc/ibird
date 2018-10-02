'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('schools',
      [
        {
          name: 'tokyo-ct',
          background_image: 'minimal_background.png'
        }
      ]
      , {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('schools', null, {})
  }
}
