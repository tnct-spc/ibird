'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('schools',
      [
        {
          name: 'tokyo-ct',
          background_image: 'minimal_background1.png',
          background_images: [
            'minimal_background1.png',
            'minimal_background2.png',
            'minimal_background3.png',
            'minimal_background4.png',
            'minimal_background5.png'
          ]
        }
      ]
      , {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('schools', null, {})
  }
}
