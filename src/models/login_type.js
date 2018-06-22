const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const orm = require('./orm');
const moment = require('moment');
const _ = require('lodash');
const Login = require('./login').model;

const LoginType = orm.define('login_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: "local"
    },
    token: {
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

LoginType.hasMany(Login);

module.exports = {
    model: LoginType,
    make: () => {
        return LoginType;
    }
};