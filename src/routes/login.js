const router = require('express').Router();
const login_controller = require('../controllers/LoginController');

router.post('/', login_controller.index);
router.post('/signin', login_controller.signin);
router.post('/new_account', login_controller.new_account);
router.post('/completeRegister', login_controller.completeRegister);

module.exports = router;
