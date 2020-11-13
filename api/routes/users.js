const router = require('express').Router(),
	usersCtrl = require('../controllers/users'),
	{ verifyToken, onlyManager } = require('../controllers/auth');

router.route('/').get(verifyToken, onlyManager, usersCtrl.getUsers);

module.exports = router;
