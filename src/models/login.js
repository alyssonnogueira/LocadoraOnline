const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const orm = require('./orm');
const moment = require('moment');
const _ = require('lodash');
const User = require('./user').model;

const Login = orm.define('login', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
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

// Login.belongsTo(User);
// Login.belongsTo(LoginType);

module.exports = {
    model: Login
};