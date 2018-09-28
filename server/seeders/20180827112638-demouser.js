'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',
      [
        {
          id: 1,
          username: 'demouser',
          hashedPassword: 'asdfghjkl:sha512:2000:695a37e87ad28e4e464514c4f1fa79379faa881c54b64f0f7eb56a8f2b820bf109d5dd5b1763d9adc83b784ff5d89de1571f4b7cbb3903d49fcc12bff8ee7cea',
          allClass: true,
          openMobile: true,
          openControl: true,
          openBB: true
        },
        {
          id: 2,
          username: 'demAdminUser',
          hashedPassword: 'asdfghjkl:sha512:2000:695a37e87ad28e4e464514c4f1fa79379faa881c54b64f0f7eb56a8f2b820bf109d5dd5b1763d9adc83b784ff5d89de1571f4b7cbb3903d49fcc12bff8ee7cea',
          allClass: true,
          openMobile: true,
          openControl: true,
          openBB: false
        },
        {
          id: 3,
          username: 'demostudent',
          hashedPassword: 'asdfghjkl:sha512:2000:695a37e87ad28e4e464514c4f1fa79379faa881c54b64f0f7eb56a8f2b820bf109d5dd5b1763d9adc83b784ff5d89de1571f4b7cbb3903d49fcc12bff8ee7cea',
          allClass: false,
          authorityClasses: [1],
          openMobile: true,
          openControl: false,
          openBB: false
        },
        {
          id: 4,
          username: 'demobb',
          hashedPassword: 'asdfghjkl:sha512:2000:695a37e87ad28e4e464514c4f1fa79379faa881c54b64f0f7eb56a8f2b820bf109d5dd5b1763d9adc83b784ff5d89de1571f4b7cbb3903d49fcc12bff8ee7cea',
          allClass: false,
          authorityClasses: [1],
          openMobile: false,
          openControl: false,
          openBB: true
        }
      ]
      , {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
