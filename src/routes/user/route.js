const loginmd = require('../../middlewares/loginmd');
const router = require('express').Router();

router.use(loginmd);

router.use(require('./get'));
router.use(require('./picture'));
router.use(require('./cover'));
router.use(require('./put'));

module.exports = router;