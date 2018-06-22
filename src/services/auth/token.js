const jwt = require('jsonwebtoken');
const config = require('../../environments').jwt;

module.exports = {

    createToken: (id, email, first_name, last_name) =>
        new Promise((resolve, reject) => 
            jwt.sign({ id, email, first_name, last_name }, config.key, (err, token) =>
                err ? reject(err) : resolve(token)
            )
        ),

    readToken: (token) => 
        new Promise((resolve, reject) => 
            jwt.verify(token, config.key, (err, decoded) => 
                err ? reject(err) : resolve(decoded)
            )
        )

}