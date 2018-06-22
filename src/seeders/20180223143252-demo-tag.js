'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('tags', [{
        content: 'geral',
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {})
},
down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    //return queryInterface.bulkDelete('tags', [{id : 1}], {});
}
};
