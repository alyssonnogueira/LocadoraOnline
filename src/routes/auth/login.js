const ad = require('../../services/auth/ad');
const tokenService = require('../../services/auth/token');
const user = require('../../models/user');
const router = require('express').Router();

router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos'
        })
    }
    const username = req.body.username;
    ad.testPassword(username, req.body.password)
        .then(() => ad.getName(username))
        .then(nome => user.createIfNotExists({ username, name: nome }))
        .then(user =>
            tokenService.createToken(user.user.username, user.user.name, user.user.admin)
                .then(token =>
                    res.set('X-Access-Token', token)
                        .json({
                            success: true,
                            new: user.new
                        })
                )
        )
        .catch(err => {
            console.error(err);
            res.status(401).json({
                success: false,
                //message: err.message
                message: "Usuário e/ou Senha Incorretos"
            })
        })
})

module.exports = router;