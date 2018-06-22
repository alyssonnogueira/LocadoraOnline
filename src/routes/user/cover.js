const User = require('../../models/user');
const router = require('express').Router();
const photo = require('../../services/upload/photo');

const fileUpload = require('express-fileupload');

router.post('/cover', fileUpload({ limits: { fileSize: 5 * 10e5, files: 1 } }), (req, res) => {
    if (!req.files.cover) {
        return res.status(400)
            .json({
                success: false,
                message: 'Envie uma imagem'
            })
    }
    const userid = res.locals.session.username;
    const file = req.files.cover;
    photo.process(file.data)
        .then(buffer => photo.saveProfileCover(userid, buffer))
        .then(url => {
            res.json({
                success: true,
                url
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Falha ao realizar upload'
            })
        })
})

module.exports = router;