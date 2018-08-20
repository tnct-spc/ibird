'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('classes', [{
        classid: 20160401,
        name: '3J',
        documents:'[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {});
  }
};
