const Sequelize = require('sequelize');
const orm = require('./orm');

const Filme = orm.define('filme', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING
    },
    diretor: {
        type: Sequelize.STRING
    },
    locado: {
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

Filme.hasMany(Filme, {foreignKey: 'filmeId'});

module.exports = {
    model: Filme,

    search: (text) =>{
        return Filme.all({
            where: {
                $or: [
                    { 'titulo': { like: '%' + text + '%' } },
                ]
            },
            order: [
                ['titulo', 'DESC']
            ]
        })
    }
};