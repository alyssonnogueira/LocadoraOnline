'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */
    return queryInterface.bulkInsert('comments', [{
        id: 1,
        content: 'Comentario Teste',
        createdAt: new Date(),
        updatedAt: new Date(),
        postId: 1,
        userId: 'alyssonr'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('comments', [{id: 1}], {});
  }
};
