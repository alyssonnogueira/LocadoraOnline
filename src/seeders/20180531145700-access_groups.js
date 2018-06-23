'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('access_groups', [{
      name: 'Administrator',
      icon: null,
      advancedGroup: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
        name: 'Clientes',
        icon: null,
        advancedGroup: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('access_groups', null, {});
  }
};
