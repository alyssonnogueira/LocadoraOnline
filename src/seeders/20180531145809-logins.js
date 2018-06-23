const bcrypt = require('bcrypt');

'use strict';

const saltRounds = 10;

let salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('logins', [{
      email: 'alysson@locadora.com',
      password: bcrypt.hashSync("admin", salt),
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('logins', null, {});
  }
};
