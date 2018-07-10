'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var doc = {
        path:"test-page-001.jpg",
        x:0,
        y:0
      }
      return queryInterface.bulkInsert('classtable', [{
        name: 'democlass1',
        documents: [JSON.stringify(doc),JSON.stringify(doc)]
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('classtable', null, {});
  }
};
