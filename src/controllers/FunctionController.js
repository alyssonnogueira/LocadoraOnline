const Function = require('../models/function');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Function Index');
};

exports.create = function (req, res) {
    console.log(req.body);
    const feature = req.body.feature;

    Function.model.create(feature).then(result => {
        return res.status(200).json({
            success: true,
            message: "Include with success",
            fun: result
        })
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "Something went wrong: " + err.message
        })
    })
};

exports.getAll = function(req, res) {
    console.log(req.query);

    Function.model.findAll({}).then(
        functions => {
            return res.status(200).json({
                success: true,
                functions: functions
            })
    }).catch(e => {
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
    const fun = req.body.feature;

    Function.model.findById(fun.id).then(feature => {
        feature.name = fun.name;
        feature.path = fun.path;
        feature.icon = fun.icon;
        feature.advancedFunction = fun.advancedFunction;
        feature.save().then(result => {
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

exports.remove = function (req, res) {
    console.log(req.query);
    const functionId = parseInt(req.query.functionId);

    Function.model.findById(functionId).then(feature => {
        console.log(feature);
        feature.destroy().then(result => {
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