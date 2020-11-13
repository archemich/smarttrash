const router = require('express').Router(),
	usersCtrl = require('../controllers/users');

router.route('/').get(usersCtrl.getUsers);

module.exports = router;
