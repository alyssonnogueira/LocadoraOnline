const config = require('../environments').database;
const Sequelize = require('sequelize');

const conn = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.tipo,
    port: config.port
})

module.exports = conn;