'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('classes', [{
        classid: 20170401,
        name: '2J',
        documents:'[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {});
  }
};
