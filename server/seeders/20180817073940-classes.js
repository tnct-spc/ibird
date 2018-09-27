'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [
      {
        classid: 1,
        year: 1,
        course: 'J',
        randomSort: true
      },
      {
        classid: 2,
        year: 1,
        course: 'M',
        randomSort: true
      },
      {
        classid: 3,
        year: 1,
        course: 'D',
        randomSort: true
      },
      {
        classid: 4,
        year: 1,
        course: 'E',
        randomSort: true
      },
      {
        classid: 5,
        year: 1,
        course: 'C',
        randomSort: true
      },
      {
        classid: 6,
        year: 2,
        course: 'J',
        randomSort: true
      },
      {
        classid: 7,
        year: 2,
        course: 'M',
        randomSort: true
      },
      {
        classid: 8,
        year: 2,
        course: 'D',
        randomSort: true
      },
      {
        classid: 9,
        year: 2,
        course: 'E',
        randomSort: true
      },
      {
        classid: 10,
        year: 2,
        course: 'C',
        randomSort: true
      },
      {
        classid: 11,
        year: 3,
        course: 'J',
        randomSort: true
      },
      {
        classid: 12,
        year: 3,
        course: 'M',
        randomSort: true
      },
      {
        classid: 13,
        year: 3,
        course: 'D',
        randomSort: true
      },
      {
        classid: 14,
        year: 3,
        course: 'E',
        randomSort: true
      },
      {
        classid: 15,
        year: 3,
        course: 'C',
        randomSort: true
      },
      {
        classid: 16,
        year: 4,
        course: 'J',
        randomSort: true
      },
      {
        classid: 17,
        year: 4,
        course: 'M',
        randomSort: true
      },
      {
        classid: 18,
        year: 4,
        course: 'D',
        randomSort: true
      },
      {
        classid: 19,
        year: 4,
        course: 'E',
        randomSort: true
      },
      {
        classid: 20,
        year: 4,
        course: 'C',
        randomSort: true
      },
      {
        classid: 21,
        year: 5,
        course: 'J',
        randomSort: true
      },
      {
        classid: 22,
        year: 5,
        course: 'M',
        randomSort: true
      },
      {
        classid: 23,
        year: 5,
        course: 'D',
        randomSort: true
      },
      {
        classid: 24,
        year: 5,
        course: 'E',
        randomSort: true
      },
      {
        classid: 25,
        year: 5,
        course: 'C',
        randomSort: true
      }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {})
  }
}
