const user_controller = require('../controllers/UserController');
const loginmd = require('../middlewares/loginmd');
const router = require('express').Router();

router.use(loginmd);

router.get('/', user_controller.index);
router.get('/get_user', user_controller.get_user);
router.get('/get_all', user_controller.getAll);
router.post('/create', user_controller.create);
router.delete('/remove', user_controller.remove);
router.put('/update', user_controller.update);

module.exports = router;
