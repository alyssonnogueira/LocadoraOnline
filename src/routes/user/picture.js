const User = require('../../models/user');
const router = require('express').Router();
const photo = require('../../services/upload/photo');

const fileUpload = require('express-fileupload');

router.post('/picture', fileUpload({ limits: { fileSize: 5 * 10e5, files: 1 } }), (req, res) => {
    if (!req.files.picture) {
        return res.status(400)
            .json({
                success: false,
                message: 'Envie uma imagem'
            })
    }
    const userid = res.locals.session.username;
    const file = req.files.picture;
    photo.processProfilePicture(file.data)
        .then(buffer => photo.saveProfilePicture(userid, buffer))
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