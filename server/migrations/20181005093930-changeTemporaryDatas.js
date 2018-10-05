'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'temporary_datas',
        'uniqueId',
        {
          type: Sequelize.STRING,
          unique: true,
          primaryKey: true
        }),
      queryInterface.removeColumn(
        'temporary_datas',
        'NoCollisonKey'
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'temporary_datas',
        'uniqueId'
      ),
      queryInterface.addColumn(
        'temporary_datas',
        'NoCollisonKey',
        {
          type: Sequelize.STRING,
          primaryKey: true
        })
    ])
  }
}
