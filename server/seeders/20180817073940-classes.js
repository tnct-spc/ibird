'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [
      {
        classid: 1,
        year: 1,
        course: 'J',
        randomSort: true,
        index: 4
      },
      {
        classid: 2,
        year: 1,
        course: 'M',
        randomSort: true,
        index: 1
      },
      {
        classid: 3,
        year: 1,
        course: 'D',
        randomSort: true,
        index: 3
      },
      {
        classid: 4,
        year: 1,
        course: 'E',
        randomSort: true,
        index: 2
      },
      {
        classid: 5,
        year: 1,
        course: 'C',
        randomSort: true,
        index: 5
      },
      {
        classid: 6,
        year: 2,
        course: 'J',
        randomSort: true,
        index: 4
      },
      {
        classid: 7,
        year: 2,
        course: 'M',
        randomSort: true,
        index: 1
      },
      {
        classid: 8,
        year: 2,
        course: 'D',
        randomSort: true,
        index: 3
      },
      {
        classid: 9,
        year: 2,
        course: 'E',
        randomSort: true,
        index: 2
      },
      {
        classid: 10,
        year: 2,
        course: 'C',
        randomSort: true,
        index: 4
      },
      {
        classid: 11,
        year: 3,
        course: 'J',
        randomSort: true,
        index: 4
      },
      {
        classid: 12,
        year: 3,
        course: 'M',
        randomSort: true,
        index: 1
      },
      {
        classid: 13,
        year: 3,
        course: 'D',
        randomSort: true,
        index: 3
      },
      {
        classid: 14,
        year: 3,
        course: 'E',
        randomSort: true,
        index: 2
      },
      {
        classid: 15,
        year: 3,
        course: 'C',
        randomSort: true,
        index: 5
      },
      {
        classid: 16,
        year: 4,
        course: 'J',
        randomSort: true,
        index: 4
      },
      {
        classid: 17,
        year: 4,
        course: 'M',
        randomSort: true,
        index: 1
      },
      {
        classid: 18,
        year: 4,
        course: 'D',
        randomSort: true,
        index: 3
      },
      {
        classid: 19,
        year: 4,
        course: 'E',
        randomSort: true,
        index: 2
      },
      {
        classid: 20,
        year: 4,
        course: 'C',
        randomSort: true,
        index: 5
      },
      {
        classid: 21,
        year: 5,
        course: 'J',
        randomSort: true,
        index: 4
      },
      {
        classid: 22,
        year: 5,
        course: 'M',
        randomSort: true,
        index: 1
      },
      {
        classid: 23,
        year: 5,
        course: 'D',
        randomSort: true,
        index: 3
      },
      {
        classid: 24,
        year: 5,
        course: 'E',
        randomSort: true,
        index: 2
      },
      {
        classid: 25,
        year: 5,
        course: 'C',
        randomSort: true,
        index: 5
      }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {})
  }
}
