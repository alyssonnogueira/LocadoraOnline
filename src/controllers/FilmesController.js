const Filme = require('../models/filme');
const User = require('../models/user');

exports.index = function(req, res) {
    res.status(200).send('Running..');
};

exports.get = function(req, res) {

    if(!req.query.id)
        return res.status(500).json({
            success: false,
            message: "Id missing"
        });

    const id = parseInt(req.query.id);

    Filme.model.find({
        where: {id : id},
        include: [
            {model: Filme.model, required: true},
        ]
    }).then(filme => {;
        return res.status(200).json({
            success: true,
            filme: filme,
        })
    });
};

exports.create = function (req, res) {

    const filme = req.body.filme;
    console.log(filme);

    Filme.model.create(filme).then(newFilme => {
        return res.status(200).json({
            success: true,
            message: "new Filme created with success",
            filme: newFilme,
        })
    })

};

exports.getAll = function(req, res) {

    Filme.model.findAll({
        include: [{
            model: Filme.model,
        }]
    }).then(
        filmes => {
            return res.status(200).json({
                success: true,
                filmes: filmes
            })
        }).catch(e => {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong: " + e.toString()
        })
    })
};

exports.update = function (req, res) {

    const filme = req.body.filme;

    Filme.model.findById(filme.id).then(filmeDB => {
        filmeDB.titulo = filme.titulo;
        filmeDB.diretor = filme.diretor;
        filmeDB.locado = filme.locado;
        filmeDB.filmeId = filme.filmeId;

        filmeDB.save().then(result => {
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

    const filmeId = parseInt(req.query.userId);

    Filme.model.findById(filmeId).then(async filme => {
        filme.destroy().then(result => {
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
            message: "Find" + err.message
        })
    });
};

exports.searchFilme = function(req, res) {

    const titulo = req.query.titulo;

    Filme.search(titulo).then(filmes => {
            return res.status(200).json({
                success: true,
                filmes: filmes
            });
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: "Internal Error",
                stack: err
            })
        })

};

exports.rent = async function(req, res) {

    const filmeId = req.query.filmeId;
    const userId = res.locals.session.id;

    const filmeLivre = await freeFilmes(filmeId);
    if (filmeLivre == null)
        return res.status(200).json({
            success: false,
            message: "Não existem mais filmes livres"
        });

    const user = await User.model.findById(userId);
    user.addFilmes(filmeLivre).then(result => {
            return res.status(200).json({
                success: true,
                result: result,
                message: "Filme Locado com sucesso"
            })
        }).catch(err => {
             filmeLivre.locado = false;
             filmeLivre.save();
            return res.status(500).json({
                success: true,
                message: "Internal server error",
                stack: err
            })
        });
};

exports.return = async function(req, res) {
    console.log(req.body);
    const filmeId = req.query.filmeId;
    const userId = res.locals.session.id;

    const filme = await Filme.model.findOne({
        where: [
            {id : filmeId},
            {userId: userId}
        ]
    });

    filme.locado = false;
    filme.userId = null;
    filme.save().then(() => {
        return res.status(200).json({
            success: true,
            message: "Filme devolvido com sucesso"
        });
    })
        .catch(err => {
            return res.status(500).json({
                success: true,
                message: "Internal server error",
                stack: err
            });
        });
};

freeFilmes = async function(id){
    const filme = await Filme.model.findById(id);

    if (!filme.locado){
        filme.locado = true;
        await filme.save();
        return filme;
    } else {
        const freeFilme = (await filme.getFilmes()).some(filme => {
            if (!filme.locado)
                return true;
        });

        if (freeFilme === false)
            return null;

        freeFilme.locado = true;
        freeFilme.save();
        return freeFilme;
    }
};