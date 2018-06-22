const jwt = require('../services/auth/token');

module.exports = (req, res, next) => {
    const token = req.get('x-access-token');
    if (!token)
        return res.status(401)
            .json({
                success: false,
                message: 'Acesso não autorizado'
            });
    jwt.readToken(token)
        .then(data => {
            res.locals.session = data;
            next();
        })
        .catch(err =>
            res.status(401)
                .json({
                    success: false,
                    message: 'Acesso não autorizado'
                })
        )
}