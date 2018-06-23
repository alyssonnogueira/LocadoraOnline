'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('access_group_has_functions', [{
      role: 'Seed',
      accessGroupId: 1,
      functionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        role: 'Seed',
        accessGroupId: 1,
        functionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        role: 'Seed',
        accessGroupId: 1,
        functionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
        {
            role: 'Seed',
            accessGroupId: 1,
            functionId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            role: 'Seed',
            accessGroupId: 2,
            functionId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('access_group_has_functions', null, {});
  }
};
