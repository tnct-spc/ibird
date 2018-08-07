'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [
      {
        classid: 20160401,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 3,
        course: 'Machine'
      },
      {
        classid: 20160402,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 3,
        course: 'Joho'
      },
      {
        classid: 20160403,
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]',
        year: 3,
        course: 'Denshi'
      },
      {
        classid: 20170401,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 2,
        course: 'Machine'
      },
      {
        classid: 20170402,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 2,
        course: 'Joho'
      },
      {
        classid: 20170403,
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]',
        year: 2,
        course: 'Denshi'
      },
      {
        classid: 20180401,
        documents:'[{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200},{"docid": "20180405","x": 100,"y": 200}]',
        year: 1,
        course: 'Machine'
      },
      {
        classid: 20180402,
        documents:'[{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200},{"docid": "20180405","x": 100,"y": 200}]',
        year: 1,
        course: 'Joho'
      },
      {
        classid: 20180403,
        documents:'[{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200},{"docid": "20180405","x": 100,"y": 200}]',
        year: 1,
        course: 'Denshi'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {})
  }
};
