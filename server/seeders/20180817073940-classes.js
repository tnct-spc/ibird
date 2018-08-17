'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [
      {
        classid: 1,
        docids:[1,2,3],
        year: 1,
        course: 'J'
      },
      {
        classid: 2,
        docids: [4,5],
        year: 1,
        course: 'M'
      },
      {
        classid: 3,
        docids: [6],
        year: 1,
        course: 'D'
      },
      {
        classid: 4,
        docids: [7],
        year: 1,
        course: 'E'
      },
      {
        classid: 5,
        docids: [8],
        year: 1,
        course: 'C'
      },
      {
        classid: 6,
        docids: [9],
        year: 2,
        course: 'J'
      },
      {
        classid: 7,
        docids: [10],
        year: 2,
        course: 'M'
      },
      {
        classid: 8,
        docids: [11],
        year: 2,
        course: 'D'
      },
      {
        classid: 9,
        docids: [12],
        year: 2,
        course: 'E'
      },
      {
        classid: 10,
        docids: [13],
        year: 2,
        course: 'C'
      },
       {
        classid: 11,
        docids: [14],
        year: 3,
        course: 'J'
      },
      {
        classid: 12,
        docids: [15],
        year: 3,
        course: 'M'
      },
      {
        classid: 13,
        docids: [16],
        year: 3,
        course: 'D'
      },
      {
        classid: 14,
        docids: [17],
        year: 3,
        course: 'E'
      },
      {
        classid: 15,
        docids: [18],
        year: 3,
        course: 'C'
      },
      {
        classid: 16,
        docids: [19],
        year: 4,
        course: 'J'
      },
      {
        classid: 17,
        docids: [20],
        year: 4,
        course: 'M'
      },
      {
        classid: 18,
        docids: [21],
        year: 4,
        course: 'D'
      },
      {
        classid: 19,
        docids: [22],
        year: 4,
        course: 'E'
      },
      {
        classid: 20,
        docids: [23],
        year: 4,
        course: 'C'
      },
      {
        classid: 21,
        docids:[24],
        year: 5,
        course: 'J'
      },
      {
        classid: 22,
        docids: [25],
        year: 5,
        course: 'M'
      },
      {
        classid: 23,
        docids: [26],
        year: 5,
        course: 'D'
      },
      {
        classid: 24,
        docids: [27],
        year: 5,
        course: 'E'
      },
      {
        classid: 25,
        docids: [28],
        year: 5,
        course: 'C'
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {})
  }
 };
