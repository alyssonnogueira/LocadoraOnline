const Filme = require('../models/filme');
const User = require('../models/user');

exports.index = function(req, res) {
    res.status(200).send('Running..');
};

exports.get = function(req, res) {
    console.log(req.query);
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
    }).then(filme => {
        //console.log(filme);
        return res.status(200).json({
            success: true,
            filme: filme,
        })
    });
};

exports.create = function (req, res) {
    console.log(req.body);
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
    console.log(req.query);

    Filme.model.findAll({
        include: [{
            model: Filme.model,
            as: 'filme',
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
    console.log(req.body);
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
    console.log(req.query);
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
            message: "Find"+err.message
        })
    });


exports.searchFilme = function(req, res) {
    console.log(req.query);
    const titulo = req.query.titulo;

    Filme.model.search(titulo).then(filmes => {
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
    console.log(req.body);
    const filmeId = req.body.filmeId;
    const userId = this.req.session.id;

    const filmeLivre = freeFilmes(filmeId);
    if (filmeLivre == null)
        return res.status(200).json({
            success: false,
            message: "Não existem mais filmes livres"
        });

    User.model.findById(userId).then(user => {
        user.addFilmes(filme).then(result => {
            return res.status(200).json({
                success: true,
                result: result,
                message: "Filme Locado com sucesso"
            })
        }).catch(err => {
            return res.status(500).json({
                success: true,
                message: "Internal server error",
                stack: err
            })
        })
    });
};

exports.return = async function(req, res) {
    console.log(req.body);
    const filmeId = req.body.filmeId;
    const userId = this.req.session.id;

    const filmes = await Filme.model.findAll({
        where: [
            {id : filmeId},
            {userId: userId}
        ]
    });

    await filmes.forEach(async filme => {
            filme.locado = false;
            filme.userId = null;
            filme.save();
        });

    return res.status(200).json({
        success: true,
        message: "Filme devolvido com sucesso"
    })


};

freeFilmes = async function(id){
    const filme = await Filme.model.findById({
        where: {id : id},
        include: [
            {model: Filme.model, required: true},
        ]
    });

    if (!filme.locado){
        filme.locado = true;
        await filme.save();
        return filme;
    } else {
        const freeFilme = filme.filmes.some(filme => {
            if (!filme.locado)
                return true;
        });

        if (freeFilme == null)
            return null;

        freeFilme.locado = true;
        freeFilme.save();
        return freeFilme;
    }
}

};