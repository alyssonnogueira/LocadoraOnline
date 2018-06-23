const FilmesController = require('../controllers/FilmesController');
const loginmd = require('../middlewares/loginmd');
const router = require('express').Router();

router.use(loginmd);

router.get('/', FilmesController.index);
router.get('/get', FilmesController.get);
router.get('/get_all', FilmesController.getAll);
router.post('/create', FilmesController.create);
router.delete('/remove', FilmesController.remove);
router.put('/update', FilmesController.update);
router.get('/search', FilmesController.searchFilme);
router.post('/rent', FilmesController.rent);
router.post('/return', FilmesController.return);

module.exports = router;
