/* Configurações do ambiente de produção */

module.exports = {
    database: {
        tipo: 'postgres',
        host: 'localhost',
        user: 'postgres',
        password: '12345',
        database: 'academiaweb'
    },
    ldap: {
        domain: 'alysson.com.br',
        url: 'ldap://192.168.10.5',
        user: 'alysson\\ldap.alysson',
        password: 'd05m07a13'
    },
    http: {
        port: 8080
    }
}