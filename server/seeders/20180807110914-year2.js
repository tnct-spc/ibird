'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [
      {
        classid: 1,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 1,
        course: 'J'
      },
      {
        classid: 2,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 1,
        course: 'M'
      },
      {
        classid: 3,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 1,
        course: 'D'
      },
      {
        classid: 4,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 1,
        course: 'E'
      },
      {
        classid: 5,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 1,
        course: 'C'
      },
      {
        classid: 6,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 2,
        course: 'J'
      },
      {
        classid: 7,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 2,
        course: 'M'
      },
      {
        classid: 8,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 2,
        course: 'D'
      },
      {
        classid: 9,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 2,
        course: 'E'
      },
      {
        classid: 10,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 2,
        course: 'C'
      },
       {
        classid: 11,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 3,
        course: 'J'
      },
      {
        classid: 12,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 3,
        course: 'M'
      },
      {
        classid: 13,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 3,
        course: 'D'
      },
      {
        classid: 14,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 3,
        course: 'E'
      },
      {
        classid: 15,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 3,
        course: 'C'
      },
      {
        classid: 16,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 4,
        course: 'J'
      },
      {
        classid: 17,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 4,
        course: 'M'
      },
      {
        classid: 18,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 4,
        course: 'D'
      },
      {
        classid: 19,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 4,
        course: 'E'
      },
      {
        classid: 20,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 4,
        course: 'C'
      },
      {
        classid: 21,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 5,
        course: 'J'
      },
      {
        classid: 22,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 5,
        course: 'M'
      },
      {
        classid: 23,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 5,
        course: 'D'
      },
      {
        classid: 24,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 5,
        course: 'E'
      },
      {
        classid: 25,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 5,
        course: 'C'
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {})
  }
 };
