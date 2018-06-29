const tokenService = require('../services/auth/token');
const bcrypt = require('bcrypt');
const path = require('path');
const Login = require('../models/login');
const User = require('../models/user');

"use strict";

exports.index = function(req, res) {
    res.status(200).json({success: true, message: 'Running..'});
};

exports.signin = function(req, res) {

    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos'
        })
    }

    console.log(req.body.email);
    Login.model.find({
        where: { email: req.body.email }
    }).then(login => {
        if(!login)
            return res.status(400).json({
                success: true,
                message: "Email not found"
            });
        if (login.password !== null) {
            if (req.body.password === "")
                return res.status(400).json({
                    success: true,
                    message: "Password can't be empty"
                });

            if (bcrypt.compareSync(req.body.password, login.password)) {
                User.model.findById(
                    login.userId
                ).then(user => {
                    if (user.canSignin) {
                        return tokenService.createToken(user.id, user.email, user.first_name, user.last_name)
                            .then(token =>
                                res.set('X-Access-Token', token)
                                    .json({
                                        success: true,
                                        user: user
                                    })
                            )
                    } else {
                        return res.status(401).json({
                            success: true,
                            message: "Você não tem permissão para Login"
                        })
                    }
                })
            } else {
                return res.status(401).json({
                    success: true,
                    message: "Password Error, You Shall not Pass"
                })
            }
        } else {
            User.model.findById(
                login.userId
            ).then(user => {
                if (user.canSignin) {
                    return tokenService.createToken(user.id, user.email, user.first_name, user.last_name)
                        .then(token =>
                            res.set('X-Access-Token', token)
                                .json({
                                    success: true,
                                    user: user,
                                    newAccount: true,
                                    message: "User Without Password"
                                })
                        )
                } else {
                    return res.status(401).json({
                        success: true,
                        message: "Você não tem permissão para realizar login"
                    })
                }
            });
        }
    })
};

exports.new_account = function(req, res) {
    console.log(req.body);
    if (!req.body.user || !req.body.login) {
        return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos'
        })
    }

    var saltRounds = 10;

    const newUser = req.body.user;
    var newLogin = req.body.login;

    Login.model.find({
        where: {
            email: newLogin.email
        }
    }).then(userLogin => {
        if (!userLogin) {
            newUser.accessGroupId = 2;
            newUser.profile = null;
            newUser.canSignin = true;
            User.model.create(newUser).then(user => {
                if(newLogin.password !== "") {
                    var salt = bcrypt.genSaltSync(saltRounds);
                    var hash = bcrypt.hashSync(newLogin.password, salt);
                    newLogin.password = hash;
                    newLogin.userId = user.id;
                    Login.model.create(newLogin).then(login => {
                        return res.status(200).json({
                            success: true,
                            message: "new User created with success",
                            user: user,
                        })
                    })
                } else {
                    return res.status(401).json({
                        success: false,
                        message: "Password Empty",
                    })
                }
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "User exists"
            })
        }
    });
};

exports.completeRegister = function(req, res) {
    console.log(req.body);
    if (!req.body.user) {
        return res.status(400).json({
            success: false,
            message: 'Registro Inválido'
        })
    }

    var saltRounds = 10;

    const user = req.body.user;
    const login = req.body.user.login;

    User.model.findById(
        user.id,
        {include: [{
                    model: Login.model,
                    as: 'login',
                }]
        }).then(userLogin => {
            if (userLogin) {
                if(userLogin.login.password === null && login.password !== "") {
                        var salt = bcrypt.genSaltSync(saltRounds);
                        var hash = bcrypt.hashSync(login.password, salt);
                        userLogin.login.password = hash;
                        Login.model.findById(userLogin.login.id).then(loginBD => {
                            loginBD.password = userLogin.login.password;
                            loginBD.save();
                        } );
                        userLogin.save().then(result => {
                            console.log(result.user);
                            return tokenService.createToken(result.user.id, result.user.email, result.user.first_name, result.user.last_name)
                                .then(token =>
                                    res.set('X-Access-Token', token)
                                        .json({
                                            success: true,
                                            user: result.user
                                        })
                                );
                        })
                } else {
                    return res.status(401).json({
                        success: false,
                        message: "Password Empty",
                    })
                }
            } else {
                return res.status(401).json({
                    success: false,
                    message: "User not exist"
                })
            }
        });
};