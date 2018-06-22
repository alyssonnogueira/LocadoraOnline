const Sequelize = require('sequelize');
const orm = require('./orm');
const AccessGroup = require('./access_group').model;
const Function = require('./function').model;

const AccessGroupHasFunction = orm.define('access_group_has_function', {
    role: Sequelize.STRING
});

AccessGroup.belongsToMany(Function, { through: AccessGroupHasFunction});
Function.belongsToMany(AccessGroup, { through: AccessGroupHasFunction});

//tag.addPost(post, { role: 'manager', transaction: t });

module.exports = {
    model: AccessGroupHasFunction,
    make: (accessGroupId, functionId, role) =>
        AccessGroupHasFunction.create({
            accessGroupId,
            functionId,
            role
        })
};