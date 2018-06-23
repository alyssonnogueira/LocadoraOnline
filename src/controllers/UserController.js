const tokenService = require('../services/auth/token');
const bcrypt = require('bcrypt');
const path = require('path');
const Login = require('../models/login');
const User = require('../models/user');
const AccessGroup = require('../models/access_group');
const AccessGroupHasFunction = require('../models/access_group_has_function');

exports.index = function(req, res) {
    res.status(200).send('Running..');
};

exports.get_user = function(req, res) {
    console.log(req.query);
    if(!req.query.id)
        return res.status(500).json({
            success: false,
            message: "Id missing"
        });
    const id = parseInt(req.query.id);

    User.model.find({
        where: {id : id},
        include: [
            {model: Login.model, required: true},
            {model: AccessGroup.model, required: true}
        ]
    }).then(user => {
        //console.log(user.access_group);
        AccessGroup.model.findById(user.access_group.id, {}).then(
           group => {
               group.getFunctions().then(functions => {
                   return res.status(200).json({
                       success: true,
                       user: user,
                       functions: functions
                   })
               });
           }
        )
    });
};

exports.create = function (req, res) {
    console.log(req.body);
    const user = req.body.user;
    console.log("TESTE");
    console.log(user);
    Login.model.find({
        where: {
            email: user.login.email
        }
    }).then(userLogin => {
        if (!userLogin) {
            user.profile = null;
            user.login.password = null;
            user.accessGroupId = user.access_group.id;
            User.model.create(user).then(newUser => {
                user.login.userId = newUser.id;
                Login.model.create(user.login).then(login => {
                    return res.status(200).json({
                        success: true,
                        message: "new User created with success",
                        user: newUser,
                    })
                })
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "User exists"
            })
        }
    });
};

exports.getAll = function(req, res) {
    console.log(req.query);

    User.model.findAll({
        include: [{
            model: AccessGroup.model,
            as: 'access_group',
        },{
            model: Login.model,
            as: 'login',
        }]
    }).then(
        users => {
            return res.status(200).json({
                success: true,
                users: users
            })
        }).catch(e => {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: "Something went wrong: " + e.toString()
            })
    })
};

exports.getById = function (req, res) {
    const functionId = parseInt(req.query.functionId);

    Function.model.findById(functionId).then(feature => {
        return res.status(200).json({
            success: true,
            message: "Removed with success",
            fun: feature
        })
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    })
};

exports.update = function (req, res) {
    console.log(req.body);
    const user = req.body.user;

    User.model.findById(user.id).then(userDB => {
        userDB.first_name = user.first_name;
        userDB.last_name = user.last_name;
        userDB.profile = user.profile;
        userDB.accessGroupId = user.accessGroupId;
        userDB.canSignin = user.canSignin;

        userDB.save().then(result => {
            return res.status(200).json({
                success: true,
                message: "Saved with success"
            })
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        })
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    });
};

exports.remove = async function (req, res) {
    console.log(req.query);
    const userId = parseInt(req.query.userId);

    User.model.findById(userId).then(async user => {
        await Login.model.find({where:{userId: user.id}}).then(login => { login.destroy().then(console.log("Login Deleted"))})
            .catch(err => {
                console.log(err)
            });
        user.destroy().then(result => {
            return res.status(200).json({
                success: true,
                message: "Removed with success"
            })
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        })
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "Find"+err.message
        })
    });
};