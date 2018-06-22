const loginmd = require('../middlewares/loginmd');
const router = require('express').Router();
const access_group_controller = require('../controllers/AccessGroupController');

router.use(loginmd);

router.post('/', access_group_controller.index);
router.get('/get_all', access_group_controller.getAll);
router.post('/create', access_group_controller.create);
router.get('/get_by_id', access_group_controller.getById);
router.delete('/remove', access_group_controller.remove);
router.post('/update', access_group_controller.update);
router.post('/updatePermissions', access_group_controller.updatePermissions);

module.exports = router;