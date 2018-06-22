const loginmd = require('../middlewares/loginmd');
const router = require('express').Router();
const function_controller = require('../controllers/FunctionController');

router.use(loginmd);

router.post('/', function_controller.index);
router.get('/get_all', function_controller.getAll);
router.post('/create', function_controller.create);
router.get('/get_by_id', function_controller.getById);
router.delete('/remove', function_controller.remove);
router.post('/update', function_controller.update);


module.exports = router;