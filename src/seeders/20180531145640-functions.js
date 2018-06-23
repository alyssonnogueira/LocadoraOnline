'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('functions', [{
        name: 'Funções',
        path: 'functions',
        icon: 'list_alt',
        advancedFunction: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
          {
              name: 'Grupos de Acesso',
              path: 'access_groups',
              icon: 'group_work',
              advancedFunction: true,
              createdAt: new Date(),
              updatedAt: new Date(),
          },{
              name: 'Usuarios',
              path: 'users',
              icon: 'people',
              advancedFunction: false,
              createdAt: new Date(),
              updatedAt: new Date(),
          },{
              name: 'Filmes',
              path: 'filmes',
              icon: 'movie',
              advancedFunction: false,
              createdAt: new Date(),
              updatedAt: new Date(),
          }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('functions', null, {});
  }
};
