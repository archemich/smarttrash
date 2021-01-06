const router = require('express').Router(),
	authCtrl = require('../controllers/auth');

router.route('/login').post(authCtrl.login);
router.route('/verify').post(authCtrl.verify)

router.route('/register').post(authCtrl.register);

module.exports = router;
