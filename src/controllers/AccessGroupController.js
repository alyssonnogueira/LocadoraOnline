const AccessGroup = require('../models/access_group');
const Function = require('../models/function');
const AccessGroupHasFunction = require('../models/access_group_has_function');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Access Group Index');
};

exports.create = function (req, res) {
    console.log(req.body);
    const group = req.body.group;

    AccessGroup.model.create(group).then(result => {
        return res.status(200).json({
            success: true,
            message: "Include with success",
            group: result
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

    AccessGroup.model.findAll({
        include: [{
            model: Function.model,
            as: 'functions',
        }]
    }).then(
        groups => {
            return res.status(200).json({
                success: true,
                groups: groups
            })
        }).catch(e => {
        return res.status(500).json({
            success: false,
            message: "Something went wrong: " + e.toString()
        })
    })
};

exports.getById = function (req, res) {
    const accessGroupId = parseInt(req.query.accessGroupId);

    AccessGroup.model.findById(accessGroupId).then(feature => {
        return res.status(200).json({
            success: true,
            message: "Removed with success",
            group: group
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
    const group = req.body.group;

    AccessGroup.model.findById(group.id).then(editedGroup => {
        editedGroup.name = group.name;
        editedGroup.icon = group.icon;
        editedGroup.advancedGroup = group.advancedGroup;
        editedGroup.save().then(result => {
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

exports.updatePermissions = function (req, res) {
    console.log(req.body);
    const group = req.body.group;
    const funs = group.functions;

    AccessGroupHasFunction.model.findAll({ where : {accessGroupId: group.id}}).then(relationships => {
        relationships.forEach(relationship => {
            relationship.deletable = true;
            funs.forEach(fun => {
                if (relationship.functionId === fun.id) {
                    relationship.deletable = false;
                    fun.new = false;
                }

                if (fun.new !== false)
                    fun.new = true;
            });
            if (relationship.deletable)
                relationship.destroy();
        });

        funs.forEach(fun => {
            console.log(fun.new);
            if (fun.new !== false) {
                try {
                    AccessGroupHasFunction.make(group.id, fun.id, res.locals.session.email).then(console.log("Success")).catch(e => {
                        console.log(e)
                    })
                } catch (e) {
                    console.log(e);
                }
            }
        });
    });

    return res.status(200).json({
        success: true,
        message: "Permissions Changed"
    });
};

exports.remove = function (req, res) {
    console.log(req.query);
    const accessGroupId = parseInt(req.query.accessGroupId);

    AccessGroup.model.findById(accessGroupId).then(group => {
        console.log(group);
        group.destroy().then(result => {
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