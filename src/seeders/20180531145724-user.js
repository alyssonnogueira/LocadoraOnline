'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('users', [{
        first_name: 'Alysson',
        last_name: 'Nogueira',
        profile: null,
        canSignin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        accessGroupId: 1
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('users', null, {});
  }
};
