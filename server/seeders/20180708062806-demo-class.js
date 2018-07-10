'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var doc = {
        "path":"test-page-001.jpg",
        "x":0,
        "y":0
      }
      return queryInterface.bulkInsert('clas', [{
        name: 'demo-class',
        doc: [JSON.stringify(doc),JSON.stringify(doc)],
        createdAt:new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('clas', null, {});
  }
};
