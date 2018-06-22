'use strict';

//import * as models from "../models";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
        username: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        picture: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cover: {
            type: Sequelize.STRING,
            allowNull: true
        },
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        createdAt: {
          type: 'TIMESTAMP',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull:false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    })

/*
  Add altering commands here.
  Return a promise to correctly handle asynchronicity.

  Example:
  return queryInterface.createTable('users', { id: Sequelize.INTEGER });
*/
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('users');
  }
};
