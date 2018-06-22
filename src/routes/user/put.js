const User = require('../../models/user');
const path = require('path');
const router = require('express').Router();

router.put('/admin', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const administrator = req.body.admin;

    if (!username) {
        return res.status(400).json({
            success: true,
            message: 'Usuário não encontrada'
        });
    }

    User.model.find({
        where: {
            username: res.locals.session.username
        }
    }).then(user => {
        console.log(user.admin);
        if(!user.admin){
            return res.status(401).json({
                success: false,
                message: 'Falha ao atualizar Permissões, apenas Administradores podem modificar permissões'
            })
        }
    })

    User.model.update({
        admin: administrator
    }, {
        where: {
            username: username
        }
    }).then(user => {
        if(!user)
            return res.status(400).json({
                success: false,
                message: 'Usuário não encontrada'
            });

        //user.admin = (administrator === "true");

        //update(tag)
        //user.save().then(() => {
            res.json({
                success: true,
                user
            })
        //})
        //     .catch(err => {
        //         console.error(err);
        //         res.status(400).json({
        //             success: false,
        //             message: 'Falha ao atualizar Permissões do Usuário'
        //         })
        //     })
    }).
    catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Falha ao atualizar Permissões do Usuário'
        })
    })
})


module.exports = router;