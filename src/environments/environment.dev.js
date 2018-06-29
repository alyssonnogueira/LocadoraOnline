/* Configurações do ambiente de desenvolvimento */

module.exports = {
    database: {
        tipo: 'mysql',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'locadora',
        port: 3306
    },
    jwt: {
        key: '1234567'
    },
    http: {
        port: 8085
    },
    files: {
        base: 'framework'
    }
}

//base: '../uploads'