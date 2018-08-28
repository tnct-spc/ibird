'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [
      {
        classid: 1,
        year: 1,
        course: 'J'
      },
      {
        classid: 2,
        year: 1,
        course: 'M'
      },
      {
        classid: 3,
        year: 1,
        course: 'D'
      },
      {
        classid: 4,
        year: 1,
        course: 'E'
      },
      {
        classid: 5,
        year: 1,
        course: 'C'
      },
      {
        classid: 6,
        year: 2,
        course: 'J'
      },
      {
        classid: 7,
        year: 2,
        course: 'M'
      },
      {
        classid: 8,
        year: 2,
        course: 'D'
      },
      {
        classid: 9,
        year: 2,
        course: 'E'
      },
      {
        classid: 10,
        year: 2,
        course: 'C'
      },
       {
        classid: 11,
        year: 3,
        course: 'J'
      },
      {
        classid: 12,
        year: 3,
        course: 'M'
      },
      {
        classid: 13,
        year: 3,
        course: 'D'
      },
      {
        classid: 14,
        year: 3,
        course: 'E'
      },
      {
        classid: 15,
        year: 3,
        course: 'C'
      },
      {
        classid: 16,
        year: 4,
        course: 'J'
      },
      {
        classid: 17,
        year: 4,
        course: 'M'
      },
      {
        classid: 18,
        year: 4,
        course: 'D'
      },
      {
        classid: 19,
        year: 4,
        course: 'E'
      },
      {
        classid: 20,
        year: 4,
        course: 'C'
      },
      {
        classid: 21,
        year: 5,
        course: 'J'
      },
      {
        classid: 22,
        year: 5,
        course: 'M'
      },
      {
        classid: 23,
        year: 5,
        course: 'D'
      },
      {
        classid: 24,
        year: 5,
        course: 'E'
      },
      {
        classid: 25,
        year: 5,
        course: 'C'
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {})
  }
 };
