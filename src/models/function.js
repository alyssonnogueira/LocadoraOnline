const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const orm = require('./orm');
const moment = require('moment');
const _ = require('lodash');

const Function = orm.define('function', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    path: {
        type: Sequelize.STRING
    },
    icon: {
        type: Sequelize.STRING
    },
    advancedFunction: {
        type: Sequelize.BOOLEAN
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
    },
});

module.exports = {
    model: Function,
    make: () => {
        return Function;
    }
};