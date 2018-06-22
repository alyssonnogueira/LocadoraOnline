const ActiveDirectory = require('activedirectory');
const config = require('../../environments').ldap;
const cache = require('memory-cache');

// const ad = new ActiveDirectory({
//     url: config.url,
//     port: config.port,
//     baseDN: config.basedn,
//     tlsOptions: {
//       'rejectUnauthorized': false
//     },
//     username: config.user,
//     password: config.password,
//     attributes: {
//       user: ['mail', 'displayName']
//     }
// });

const days = num => num * 8.64e7;

module.exports = {
    // testPassword: (user, pass) =>
    //     new Promise((resolve, reject) =>
    //         ad.authenticate(`${user}@alysson.com.br`, pass, (err, auth) =>
    //             (err || !auth) ? reject(new Error('Senha incorreta.')) : resolve()
    //         )
    //     ),
    //
    // getName: (user) =>
    //     new Promise((resolve, reject) => {
    //         const incache = cache.get(user);
    //         if (incache)
    //             return resolve(incache);
    //         ad.findUser(user, (err, data) => {
    //             if (err || !data)
    //                 return reject(new Error('Usuário não encontrado.'));
    //             cache.put(user, data.displayName, days(2));
    //             resolve(data.displayName);
    //         })
    //     })
}