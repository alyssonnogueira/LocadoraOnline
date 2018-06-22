const User = require('../../models/user');
const router = require('express').Router();

router.get('/byId', (req, res) => {
    if (!req.query.id) {
        return res.status(400).json({
            success: true,
            message: 'User não encontrado'
        });
    }
    const username = req.query.id;
    User.model.findOne({ where: { username } }).then(usr => {
        if (!usr) {
            return res.status(400).json({
                success: true,
                message: 'User não encontrado'
            });
        }
        res.json({
            success: true,
            user: usr
        })
    }).catch(err => {
        res.status(500).json({
            success: false,
            message: 'Falha ao buscar o User'
        })
    })
})

router.get('/search', (req, res) => {
    User.search(req.query.text)
        .then(users => {
            console.log(users);
            res.json({
                success: true,
                users
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500)
                .json({
                    success: false,
                    message: 'Falha ao buscar Usuários'
                })
        })
});


module.exports = router;