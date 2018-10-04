'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'allClass',
        {
          type: Sequelize.BOOLEAN
        }),
      queryInterface.addColumn(
        'users',
        'authorityClasses',
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER)
        }),
      queryInterface.addColumn(
        'users',
        'openControl',
        {
          type: Sequelize.BOOLEAN
        }),
      queryInterface.addColumn(
        'users',
        'openMobile',
        {
          type: Sequelize.BOOLEAN
        }),
      queryInterface.addColumn(
        'users',
        'openBB',
        {
          type: Sequelize.BOOLEAN
        })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'users',
        'allClass'
      ),
      queryInterface.removeColumn(
        'users',
        'authorityClasses'
      ),
      queryInterface.removeColumn(
        'users',
        'openControl'
      ),
      queryInterface.removeColumn(
        'users',
        'openMobile'
      ),
      queryInterface.removeColumn(
        'users',
        'openBB'
      )
    ])
  }
}
