/* Configurações do ambiente de produção */

module.exports = {
    database: {
        tipo: 'mysql',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'locadora'
    },
    http: {
        port: 8080
    },
    jwt: {
        key: '1234567'
    },
    files: {
        base: '../uploads'
    }
}
//base: '../uploads' 'rede'