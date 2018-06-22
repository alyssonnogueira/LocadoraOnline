const Sequelize = require('sequelize');
const orm = require('./orm');
const Login = require('./login').model;
const AccessGroup = require('./access_group').model;

const User = orm.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    profile: {
        type: Sequelize.STRING,
        allowNull: true
    },
    canSignin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

User.hasOne(Login);
User.belongsTo(AccessGroup, {foreignKey: 'accessGroupId'});

module.exports = {
    model: User,

    search: (text) =>{
        return User.all({
            where: {
                $or: [
                    { 'name': { like: text + '%' } },
                ]
            },
            order: [
                ['name', 'DESC']
            ]
        })
    }
};