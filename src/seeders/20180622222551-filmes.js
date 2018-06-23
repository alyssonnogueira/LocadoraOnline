'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('filmes', [{
          titulo: 'Senhor dos Anéis',
          diretor: 'Peter Jackson',
          locado: false,
          createdAt: new Date(),
          updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('filmes', null, {});
  }
};
