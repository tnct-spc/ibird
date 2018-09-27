'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('documents', [
      {
        classid: 1,
        docid: '1',
        x: 0,
        y: 0,
        sizeX: 2483,
        sizeY: 3513,
        priority: 1,
        endTime: new Date(2020, 1, 1),
        startTime: new Date(2001, 1, 1),
        title: 'タイトルテスト',
        openMobile: true
      },
      {
        classid: 1,
        docid: '2',
        x: 0,
        y: 0,
        sizeX: 4000,
        sizeY: 2250,
        priority: 1,
        endTime: new Date(2020, 1, 1),
        startTime: new Date(2001, 1, 1),
        title: 'タイトルテスト',
        openMobile: true
      },
      {
        classid: 1,
        docid: '4',
        x: 0,
        y: 0,
        sizeX: 3513,
        sizeY: 4963,
        priority: 1,
        endTime: new Date(2020, 1, 1),
        startTime: new Date(2001, 1, 1),
        title: 'タイトルテスト',
        openMobile: true
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {

  }
}
