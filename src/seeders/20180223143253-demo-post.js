'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('posts', [{
        content: 'Primeiro POST SEED',
        mediaType: 0,
        media: null,
        child: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'alyssonr'
    }], {})
},
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('posts', [{id : 1}], {});
  }
};
