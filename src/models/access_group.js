const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const orm = require('./orm');
const moment = require('moment');
const _ = require('lodash');
//const User = require('./user').model;
//const AccessGroupHasFunction = require('./access_group_has_function').model;

const AccessGroup = orm.define('access_group', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    icon: {
        type: Sequelize.STRING
    },
    advancedGroup: {
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
    }
});

//AccessGroup.belongsToMany(AccessGroupHasFunction);
//AccessGroup.hasMany(User);

module.exports = {
    model: AccessGroup,
};